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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppKitAccount } from "@reown/appkit/react";

export default function CreateWallet() {
  const { isConnected } = useAppKitAccount();
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
        <div className="space-y-2">
          <Label htmlFor="walletName">钱包名称</Label>
          <Input id="walletName" placeholder="我的钱包" />
        </div>

        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          生成钱包
        </Button>
      </CardContent>
    </Card>
  );
}
