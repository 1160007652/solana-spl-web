"use client";

import { Settings, Shield, Snowflake, Trash2, Zap } from "lucide-react";
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

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SplManageModuleProps {
  isConnected: boolean;
}

export default function SplManageModule({ isConnected }: SplManageModuleProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-600" />
            代币权限管理
          </CardTitle>
          <CardDescription>管理代币的铸造、冻结和销毁权限</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="mint" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mint">铸造权限</TabsTrigger>
              <TabsTrigger value="freeze">冻结权限</TabsTrigger>
              <TabsTrigger value="burn">销毁权限</TabsTrigger>
            </TabsList>

            <TabsContent value="mint" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="tokenMint">代币地址</Label>
                <Input
                  id="tokenMint"
                  placeholder="输入代币 Mint 地址"
                  disabled={!isConnected}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mintAmount">铸造数量</Label>
                <Input
                  id="mintAmount"
                  type="number"
                  placeholder="1000"
                  disabled={!isConnected}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mintTo">铸造到地址</Label>
                <Input
                  id="mintTo"
                  placeholder="接收地址"
                  disabled={!isConnected}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" disabled={!isConnected}>
                  <Zap className="h-4 w-4 mr-2" />
                  铸造代币
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!isConnected}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  撤销铸造权限
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="freeze" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="freezeToken">代币地址</Label>
                <Input
                  id="freezeToken"
                  placeholder="输入代币 Mint 地址"
                  disabled={!isConnected}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="freezeAccount">账户地址</Label>
                <Input
                  id="freezeAccount"
                  placeholder="要冻结的账户地址"
                  disabled={!isConnected}
                />
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" disabled={!isConnected}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  冻结账户
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  disabled={!isConnected}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  解冻账户
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="burn" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="burnToken">代币地址</Label>
                <Input
                  id="burnToken"
                  placeholder="输入代币 Mint 地址"
                  disabled={!isConnected}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="burnAmount">销毁数量</Label>
                <Input
                  id="burnAmount"
                  type="number"
                  placeholder="100"
                  disabled={!isConnected}
                />
              </div>
              <Button
                className="w-full"
                variant="destructive"
                disabled={!isConnected}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                销毁代币
              </Button>
              <div className="text-xs text-red-500 text-center">
                ⚠️ 销毁操作不可逆，请谨慎操作
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
