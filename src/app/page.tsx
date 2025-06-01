"use client";

import { useState } from "react";
import {
  Wallet,
  Send,
  Coins,
  Plus,
  Settings,
  Zap,
  Shield,
  Trash2,
  Snowflake,
  Calculator,
  Copy,
  ExternalLink,
  ChevronDown,
  ImageIcon,
  Link,
  Upload,
  Eye,
  KeyRound,
  FileCode,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/containers/header";
import ContentTips from "@/containers/content-tips";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  const [counterValue, setCounterValue] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Header />

        {/* Main Content with Tabs */}
        <Tabs defaultValue="wallet" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <KeyRound className="h-4 w-4" />
              <span className="hidden sm:inline">钱包管理</span>
              <span className="sm:hidden">钱包</span>
            </TabsTrigger>
            <TabsTrigger value="tokens" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">代币操作</span>
              <span className="sm:hidden">代币</span>
            </TabsTrigger>
            <TabsTrigger
              value="permissions"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">权限管理</span>
              <span className="sm:hidden">权限</span>
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-2">
              <FileCode className="h-4 w-4" />
              <span className="hidden sm:inline">合约交互</span>
              <span className="sm:hidden">合约</span>
            </TabsTrigger>
          </TabsList>

          {/* Wallet Management Tab */}
          <TabsContent value="wallet" className="space-y-6">
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
                    <Input
                      id="memo"
                      placeholder="转账备注"
                      disabled={!isConnected}
                    />
                  </div>
                  <Button className="w-full" disabled={!isConnected}>
                    <Send className="h-4 w-4 mr-2" />
                    发送转账
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Token Operations Tab */}
          <TabsContent value="tokens" className="space-y-6">
            {/* Create Token */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-green-600" />
                  创建代币
                </CardTitle>
                <CardDescription>
                  在 Solana 网络上创建新的 SPL 代币
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokenName">代币名称</Label>
                      <Input
                        id="tokenName"
                        placeholder="My Token"
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tokenSymbol">代币符号</Label>
                      <Input
                        id="tokenSymbol"
                        placeholder="MTK"
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="decimals">小数位数</Label>
                      <Select disabled={!isConnected}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择小数位数" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6</SelectItem>
                          <SelectItem value="8">8</SelectItem>
                          <SelectItem value="9">9</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="supply">初始供应量</Label>
                      <Input
                        id="supply"
                        type="number"
                        placeholder="1000000"
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>代币标准</Label>
                      <Select disabled={!isConnected}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择代币标准" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fungible">
                            Fungible Token
                          </SelectItem>
                          <SelectItem value="non-fungible">
                            Non-Fungible Token
                          </SelectItem>
                          <SelectItem value="semi-fungible">
                            Semi-Fungible Token
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full mt-6" disabled={!isConnected}>
                      <Coins className="h-4 w-4 mr-2" />
                      创建代币
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Metaplex Metadata */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-pink-600" />
                  Metaplex 元数据设置
                </CardTitle>
                <CardDescription>
                  为代币设置 Metaplex 标准元数据信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basic">基本信息</TabsTrigger>
                    <TabsTrigger value="media">媒体资源</TabsTrigger>
                    <TabsTrigger value="links">外部链接</TabsTrigger>
                    <TabsTrigger value="preview">预览</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaTokenAddress">代币地址</Label>
                        <Input
                          id="metaTokenAddress"
                          placeholder="输入代币 Mint 地址"
                          disabled={!isConnected}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaUpdateAuthority">
                          更新权限地址
                        </Label>
                        <Input
                          id="metaUpdateAuthority"
                          placeholder="元数据更新权限地址"
                          disabled={!isConnected}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaName">代币名称</Label>
                        <Input
                          id="metaName"
                          placeholder="My Awesome Token"
                          disabled={!isConnected}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaSymbol">代币符号</Label>
                        <Input
                          id="metaSymbol"
                          placeholder="MAT"
                          disabled={!isConnected}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaDescription">代币描述</Label>
                      <textarea
                        id="metaDescription"
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="详细描述您的代币用途、特性和价值..."
                        disabled={!isConnected}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaSellerFeeBasisPoints">
                          版税费率 (基点)
                        </Label>
                        <Input
                          id="metaSellerFeeBasisPoints"
                          type="number"
                          placeholder="500"
                          disabled={!isConnected}
                        />
                        <div className="text-xs text-gray-500">
                          100 基点 = 1%
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="media" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="metaImageUrl">代币图标 URL</Label>
                      <Input
                        id="metaImageUrl"
                        placeholder="https://example.com/token-logo.png"
                        disabled={!isConnected}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>或上传图片文件</Label>
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          拖拽图片到此处或
                          <Button
                            variant="link"
                            className="p-0 h-auto"
                            disabled={!isConnected}
                          >
                            点击上传
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          支持 PNG, JPG, SVG 格式，最大 5MB
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="metaAnimationUrl">
                        动画/视频 URL (可选)
                      </Label>
                      <Input
                        id="metaAnimationUrl"
                        placeholder="https://example.com/animation.mp4"
                        disabled={!isConnected}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>存储选项</Label>
                      <Select disabled={!isConnected}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择存储方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="arweave">
                            Arweave (推荐)
                          </SelectItem>
                          <SelectItem value="ipfs">IPFS</SelectItem>
                          <SelectItem value="aws">AWS S3</SelectItem>
                          <SelectItem value="custom">自定义 URL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TabsContent>

                  <TabsContent value="links" className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaWebsite">官方网站</Label>
                        <Input
                          id="metaWebsite"
                          placeholder="https://mytoken.com"
                          disabled={!isConnected}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaTwitter">Twitter</Label>
                        <Input
                          id="metaTwitter"
                          placeholder="https://twitter.com/mytoken"
                          disabled={!isConnected}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="metaDiscord">Discord</Label>
                        <Input
                          id="metaDiscord"
                          placeholder="https://discord.gg/mytoken"
                          disabled={!isConnected}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="metaTelegram">Telegram</Label>
                        <Input
                          id="metaTelegram"
                          placeholder="https://t.me/mytoken"
                          disabled={!isConnected}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>自定义属性</Label>
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="属性名称"
                            disabled={!isConnected}
                          />
                          <Input placeholder="属性值" disabled={!isConnected} />
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={!isConnected}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          添加属性
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="preview" className="space-y-4 pt-4">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        元数据 JSON 预览
                      </h4>
                      <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border overflow-auto max-h-64">
                        {`{
  "name": "My Awesome Token",
  "symbol": "MAT",
  "description": "详细描述您的代币用途、特性和价值...",
  "image": "https://example.com/token-logo.png",
  "external_url": "https://example.com",
  "seller_fee_basis_points": 500,
  "attributes": [
    {
      "trait_type": "Type",
      "value": "Utility Token"
    }
  ],
  "properties": {
    "files": [
      {
        "uri": "https://example.com/token-logo.png",
        "type": "image/png"
      }
    ],
    "category": "image",
    "creators": [
      {
        "address": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        "share": 100
      }
    ]
  }
}`}
                      </pre>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1" disabled={!isConnected}>
                        <Upload className="h-4 w-4 mr-2" />
                        上传元数据
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        disabled={!isConnected}
                      >
                        <Link className="h-4 w-4 mr-2" />
                        更新代币元数据
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Management Tab */}
          <TabsContent value="permissions" className="space-y-6">
            {/* Token Permissions Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-orange-600" />
                  代币权限管理
                </CardTitle>
                <CardDescription>
                  管理代币的铸造、冻结和销毁权限
                </CardDescription>
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
          </TabsContent>

          {/* Contract Interaction Tab */}
          <TabsContent value="contracts" className="space-y-6">
            {/* Counter Contract */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-indigo-600" />
                  计数器合约
                </CardTitle>
                <CardDescription>与 Solana 计数器智能合约交互</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-indigo-600 mb-2">
                        {counterValue}
                      </div>
                      <Badge variant="secondary">当前计数值</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={() => setCounterValue((prev) => prev + 1)}
                        disabled={!isConnected}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        增加
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setCounterValue((prev) => Math.max(0, prev - 1))
                        }
                        disabled={!isConnected}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        减少
                      </Button>
                    </div>

                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => setCounterValue(0)}
                      disabled={!isConnected}
                    >
                      重置计数器
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contractAddress">合约地址</Label>
                      <Input
                        id="contractAddress"
                        placeholder="输入计数器合约地址"
                        disabled={!isConnected}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contractMethod">合约方法</Label>
                      <Select disabled={!isConnected}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择合约方法" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increment">increment()</SelectItem>
                          <SelectItem value="decrement">decrement()</SelectItem>
                          <SelectItem value="reset">reset()</SelectItem>
                          <SelectItem value="getValue">getValue()</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      className="w-full"
                      variant="secondary"
                      disabled={!isConnected}
                    >
                      <Calculator className="h-4 w-4 mr-2" />
                      调用合约方法
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Status Bar */}
        <ContentTips />
      </div>
    </div>
  );
}
