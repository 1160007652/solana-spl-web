"use client";

import { Copy, Zap } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppKitAccount } from "@reown/appkit/react";

export default function AirdropSol() {
  const { isConnected } = useAppKitAccount();
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
            <div className="w-24 space-y-2">
              <Label htmlFor="faucetAmount">领取数量</Label>
              <Select defaultValue="1">
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
            <div className="flex-1 space-y-2">
              <Label htmlFor="faucetAddress">接收地址</Label>
              <Input
                id="faucetAddress"
                placeholder="输入接收地址"
                value={""}
                disabled={!isConnected}
              />
            </div>
          </div>

          <Button className="w-full" disabled={!isConnected}>
            <Zap className="h-4 w-4 mr-2" />
            领取测试币
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
