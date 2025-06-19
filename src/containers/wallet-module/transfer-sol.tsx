"use client";

import { Send } from "lucide-react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import {
  useAppKitAccount,
  useAppKitNetwork,
  useAppKitProvider,
} from "@reown/appkit/react";
import type { Provider } from "@reown/appkit-adapter-solana/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import BigNumber from "bignumber.js";
import { toast } from "sonner";
import {
  address,
  isAddress,
  getAddressEncoder,
  createSolanaRpc,
  lamports,
  pipe,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  appendTransactionMessageInstructions,
  signTransactionMessageWithSigners,
  sendAndConfirmTransactionFactory,
  TransactionSigner,
  getSignatureFromTransaction,
  sendAndConfirmDurableNonceTransactionFactory,
  createSolanaRpcSubscriptions,
  assertIsTransactionMessageWithSingleSendingSigner,
  signAndSendTransactionMessageWithSigners,
  getBase58Decoder,
  compileTransaction,
  createNoopSigner,
  getCompiledTransactionMessageEncoder,
  getTransactionEncoder,
} from "@solana/kit";
import { getTransferSolInstruction } from "@solana-program/system";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LAMPORTS_PER_SOL } from "@/constants/solana-config";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWalletAccountTransactionSendingSigner } from "@solana/react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

// 定义表单验证模式
const formSchema = z.object({
  recipient: z
    .string()
    .min(1, "请输入 Solana 地址")
    .refine(
      async (value) => {
        try {
          // 方法1：使用 isAddress 函数验证地址格式
          if (!isAddress(value)) return false;

          // 方法2：使用 getAddressEncoder 验证地址长度
          const encoder = getAddressEncoder();
          const bytes = encoder.encode(value);

          return bytes.length === 32;
        } catch (error) {
          return false;
        }
      },
      {
        message: "请输入有效的 Solana 地址",
      }
    ),
  amount: z
    .string()
    .transform((val) => new BigNumber(val))
    .refine((val) => val.gt(0), {
      message: "请输入有效的数字",
    })
    .transform((val) => val.toString(10)),
});

type FormValues = z.infer<typeof formSchema>;

export default function TransferSol() {
  const { isConnected, address: senderAddress } = useAppKitAccount();

  const { connection } = useAppKitConnection();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  // const myWalletSigner = useWalletAccountTransactionSendingSigner(
  //   walletProvider.getAccounts()[0],
  //   walletProvider.chain
  // );
  // 初始化表单
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient: "3XUe6DaaB4qUjnuSuAxTJiQNGJQnj5r6nb1qZU5zRKyn",
      amount: "0.01",
    },
  });

  // 处理表单提交
  const onSubmit = async (values: FormValues) => {
    try {
      // if (!connection) throw Error("未链接钱包");
      // if (!senderAddress) throw Error("喂链接钱包地址");

      // // 2. 创建 RPC 客户端
      // const rpc = createSolanaRpc(connection.rpcEndpoint);

      // // 3. 转换地址和金额 - 使用 address() 方法确保地址格式正确
      // const recipientAddress = address(values.recipient); // 将字符串转换为有效的 Solana 地址
      // const amountLamports = lamports(
      //   BigInt(Number(values.amount) * LAMPORTS_PER_SOL)
      // );

      // // 创建转账指令
      // const transferInstruction = getTransferSolInstruction({
      //   source: createNoopSigner(address(senderAddress)),
      //   destination: recipientAddress,
      //   amount: amountLamports,
      // });

      // // Add the transfer instruction to a new transaction
      // const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();
      // const transactionMessage = pipe(
      //   createTransactionMessage({ version: 0 }), // 初始化新的交易消息。版本为 0
      //   (tx) =>
      //     setTransactionMessageFeePayerSigner(
      //       createNoopSigner(address(senderAddress)),
      //       tx
      //     ), // 设置交易的手续费支付者
      //   (tx) =>
      //     setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx), // 设置交易的生命周期 使用最近的区块哈希设置交易的生命周期
      //   (tx) => appendTransactionMessageInstructions([transferInstruction], tx) //  添加转账指令 将转账指令添加到交易中
      // );
      // const transaction = compileTransaction(transactionMessage);
      // console.log(transactionMessage);

      // const encoder = getTransactionEncoder();
      // const serializedTransaction = encoder.encode(transaction);

      // console.log(serializedTransaction);

      // const signature = await walletProvider.sendTransaction(
      //   serializedTransaction,
      //   connection
      // );

      // console.log("signature", signature);

      if (!senderAddress || !connection) throw Error("user is disconnected");

      const wallet = new PublicKey(senderAddress);
      if (!wallet) throw Error("wallet provider is not available");

      const latestBlockhash = await connection.getLatestBlockhash();

      const transaction = new Transaction({
        feePayer: wallet,
        recentBlockhash: latestBlockhash?.blockhash,
      }).add(
        SystemProgram.transfer({
          fromPubkey: wallet,
          toPubkey: new PublicKey(values.recipient), // destination address
          lamports: 1000,
        })
      );

      const sig = await walletProvider.sendTransaction(transaction, connection);
      console.log(sig);

      // 显示成功消息
      toast.success(
        <div>
          <div>转账成功</div>
          <div>
            向 {values.recipient} 发送 {values.amount} SOL
          </div>
        </div>
      );
    } catch (error) {
      console.error("转账失败", error);
      toast.error(<div>转账失败</div>);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5 text-blue-600" />
          转账 SOL
        </CardTitle>
        <CardDescription>向其他地址发送 SOL 代币</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="recipient"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>接收地址</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="输入 Solana 地址"
                      disabled={!isConnected}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>金额 (SOL)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="0.00"
                      disabled={!isConnected}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={!isConnected}>
              <Send className="h-4 w-4 mr-2" />
              发送转账
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
