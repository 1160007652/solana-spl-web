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
import { useState } from "react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export default function AirdropSol() {
  const [amount, setAmount] = useState<string>("1");
  const { isConnected, address } = useAppKitAccount();
  const { connection } = useAppKitConnection();

  async function handleClickAirdrop() {
    try {
      if (!connection || !address) return;
      const signature = await connection.requestAirdrop(
        new PublicKey(address),
        Number(BigInt(amount) * BigInt(LAMPORTS_PER_SOL))
      );
      // await connection.confirmTransaction(signature);
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
        <CardDescription>从水龙头获取 Solana 测试网络代币</CardDescription>
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
            disabled={!isConnected}
            onClick={handleClickAirdrop}
          >
            <Zap className="h-4 w-4 mr-2" />
            领取测试币
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
