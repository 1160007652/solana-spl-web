"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBase58Decoder } from "@solana/kit";
import { useState } from "react";
import { install } from "@solana/webcrypto-ed25519-polyfill";

export default function CreateWallet() {
  const [wallets, setWallets] = useState<
    { publicKey: string; privateKey: string }[]
  >([]);
  async function handleClickCreateKeypair() {
    install();
    const base58 = getBase58Decoder();

    // 这种方式创建的 钱包，私钥无法导出，因为 extractable: false
    // 更多是用在 solana 的链上 程序账户上
    // const wallet: CryptoKeyPair = await generateKeyPair();

    const keypair = await crypto.subtle.generateKey(
      "Ed25519",
      true, // extractable
      ["sign", "verify"]
    );

    // 原生获取公钥的方式
    const publickey = await crypto.subtle.exportKey("raw", keypair.publicKey);

    const publickeyBase58 = base58.decode(new Uint8Array(publickey)).toString();

    const privatekey = await crypto.subtle.exportKey(
      "pkcs8",
      keypair.privateKey
    );

    const privateBase58 = base58
      .decode(
        Uint8Array.from([
          ...new Uint8Array(privatekey.slice(-32)),
          ...new Uint8Array(publickey),
        ])
      )
      .toString();

    setWallets([
      ...wallets,
      { publicKey: publickeyBase58, privateKey: privateBase58 },
    ]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5 text-purple-600" />
          创建钱包
        </CardTitle>
        <CardDescription>生成新的 Solana 钱包地址</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full" onClick={handleClickCreateKeypair}>
          <Plus className="h-4 w-4 mr-2" />
          生成钱包
        </Button>

        {wallets.map((wallet, index) => {
          return (
            <div key={index} className="space-y-2 p-4 rounded-lg border">
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  钱包地址
                </div>
                <div className="font-mono break-all">{wallet.publicKey}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  私钥
                </div>
                <div className="font-mono break-all">{wallet.privateKey}</div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
