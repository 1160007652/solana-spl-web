"use client";

import { Coins, ImageIcon, Upload, Link, Eye, Plus } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TokensTabProps {
  isConnected: boolean;
}

export default function SplTokensModule({ isConnected }: TokensTabProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-green-600" />
            创建代币
          </CardTitle>
          <CardDescription>在 Solana 网络上创建新的 SPL 代币</CardDescription>
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
                    <SelectItem value="fungible">Fungible Token</SelectItem>
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
          <CardDescription>为代币设置 Metaplex 标准元数据信息</CardDescription>
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
                  <Label htmlFor="metaUpdateAuthority">更新权限地址</Label>
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
                  <div className="text-xs text-gray-500">100 基点 = 1%</div>
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
                <Label htmlFor="metaAnimationUrl">动画/视频 URL (可选)</Label>
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
                    <SelectItem value="arweave">Arweave (推荐)</SelectItem>
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
                    <Input placeholder="属性名称" disabled={!isConnected} />
                    <Input placeholder="属性值" disabled={!isConnected} />
                  </div>
                  <Button variant="outline" size="sm" disabled={!isConnected}>
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
    </div>
  );
}
