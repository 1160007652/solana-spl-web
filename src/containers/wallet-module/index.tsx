"use client";

import { Copy, Plus, Send, Zap } from "lucide-react";
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

interface WalletTabProps {
  isConnected: boolean;
}

export default function WalletModule({ isConnected }: WalletTabProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Create Wallet */}
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
          <div className="space-y-2">
            <Label>钱包类型</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="选择钱包类型" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ed25519">Ed25519</SelectItem>
                <SelectItem value="secp256k1">Secp256k1</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="backup" />
            <Label htmlFor="backup" className="text-sm">
              自动备份助记词
            </Label>
          </div>
          <Button className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            生成钱包
          </Button>
          <div className="text-xs text-gray-500 text-center">
            请安全保存您的私钥和助记词
          </div>
        </CardContent>
      </Card>

      {/* Transfer SOL */}
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
          <div className="space-y-2">
            <Label htmlFor="memo">备注 (可选)</Label>
            <Input id="memo" placeholder="转账备注" disabled={!isConnected} />
          </div>
          <Button className="w-full" disabled={!isConnected}>
            <Send className="h-4 w-4 mr-2" />
            发送转账
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            领取测试币
          </CardTitle>
          <CardDescription>从水龙头获取 Solana 测试网络代币</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>测试网络</Label>
                <Select defaultValue="devnet">
                  <SelectTrigger>
                    <SelectValue placeholder="选择网络" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="devnet">Devnet</SelectItem>
                    <SelectItem value="testnet">Testnet</SelectItem>
                    <SelectItem value="localnet">Localnet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="faucetAmount">领取数量</Label>
                <Select defaultValue="1">
                  <SelectTrigger>
                    <SelectValue placeholder="选择数量" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 SOL</SelectItem>
                    <SelectItem value="2">2 SOL</SelectItem>
                    <SelectItem value="5">5 SOL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" disabled={!isConnected}>
                <Zap className="h-4 w-4 mr-2" />
                领取测试币
              </Button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="faucetAddress">接收地址</Label>
                <div className="flex gap-2">
                  <Input
                    id="faucetAddress"
                    placeholder="输入接收地址"
                    value={""}
                    disabled={!isConnected}
                  />
                  {isConnected && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigator.clipboard.writeText("")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-md border bg-muted p-3 h-[120px] overflow-auto">
                <div className="text-xs font-medium">领取记录</div>
                {isConnected ? (
                  <div className="mt-2 space-y-1">
                    <div className="text-xs flex justify-between">
                      <span className="text-muted-foreground">2 SOL</span>
                      <span className="text-green-500">成功</span>
                    </div>
                    <div className="text-xs flex justify-between">
                      <span className="text-muted-foreground">1 SOL</span>
                      <span className="text-green-500">成功</span>
                    </div>
                    <div className="text-xs flex justify-between">
                      <span className="text-muted-foreground">5 SOL</span>
                      <span className="text-amber-500">处理中</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-[80px] text-xs text-muted-foreground">
                    请先连接钱包
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            <p>• 测试币仅用于开发和测试目的，没有实际价值</p>
            <p>• 每个地址每天有领取限额，请合理使用</p>
            <p>
              • 如需更多测试币，请访问{" "}
              <a href="#" className="text-blue-500 hover:underline">
                Solana Faucet
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
