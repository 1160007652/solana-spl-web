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
import { Keypair } from "@solana/web3.js";
import { useState } from "react";

export default function CreateWallet() {
  const [wallets, setWallets] = useState<Keypair[]>([]);
  async function handleClickCreateKeypair() {
    const keypair = await Keypair.generate();
    setWallets([...wallets, keypair]);
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
                <div className="font-mono break-all">
                  {wallet.publicKey.toBase58()}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium text-muted-foreground">
                  私钥
                </div>
                <div className="font-mono break-all">
                  {Buffer.from(wallet.secretKey).toString("base64")}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
