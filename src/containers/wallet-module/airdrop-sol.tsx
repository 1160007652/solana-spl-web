"use client";

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitConnection } from "@reown/appkit-adapter-solana/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useState, useEffect } from "react";

import { address, createSolanaRpc, lamports } from "@solana/kit";

const LAMPORTS_PER_SOL = 1_000_000_000;

export default function AirdropSol() {
  const [amount, setAmount] = useState<string>("1");
  const { isConnected, address: account } = useAppKitAccount();
  const { connection } = useAppKitConnection();
  const { caipNetwork } = useAppKitNetwork();

  async function handleClickAirdrop() {
    try {
      if (!connection || !account) return;

      const rpc = createSolanaRpc(connection.rpcEndpoint);
      // const rpc = createSolanaRpc("https://api.testnet.solana.com");

      let airdropAmt = lamports(BigInt(Number(amount) * LAMPORTS_PER_SOL));
      const signature = await rpc
        .requestAirdrop(address(account), airdropAmt, {
          commitment: "confirmed",
        })
        .send();
      console.log(signature);
      console.log(`成功空投 ${amount} SOL 到账户 ${account}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-amber-500" />
          领取测试币
        </CardTitle>
        <CardDescription>从水龙头获取 {caipNetwork?.name} 代币</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-row gap-4">
            <Label htmlFor="faucetAmount">领取数量</Label>
            <Select value={amount} onValueChange={setAmount}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择数量" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 SOL</SelectItem>
                <SelectItem value="2">2 SOL</SelectItem>
                <SelectItem value="5">5 SOL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full"
            disabled={!isConnected || !caipNetwork?.testnet}
            onClick={handleClickAirdrop}
          >
            <Zap className="h-4 w-4 mr-2" />
            领取测试币
          </Button>
          {!caipNetwork?.testnet && (
            <p className="text-red-500 text-sm mt-2">
              主网不支持空投操作，请切换到测试网或开发网
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
