"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppKitAccount } from "@reown/appkit/react";

export default function TransferSol() {
  const { isConnected } = useAppKitAccount();
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
        <div className="space-y-2">
          <Label htmlFor="recipient">接收地址</Label>
          <Input
            id="recipient"
            placeholder="输入 Solana 地址"
            disabled={!isConnected}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="amount">金额 (SOL)</Label>
          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            disabled={!isConnected}
          />
        </div>

        <Button className="w-full" disabled={!isConnected}>
          <Send className="h-4 w-4 mr-2" />
          发送转账
        </Button>
      </CardContent>
    </Card>
  );
}
