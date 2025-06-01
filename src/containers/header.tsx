import { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, Copy, ExternalLink, Wallet } from "lucide-react";

export default function Header() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("0");

  const connectWallet = () => {
    setIsConnected(true);
    setWalletAddress("7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU");
    setBalance("12.5");
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
    setBalance("0");
  };
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Solana Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            管理您的 Solana 资产和智能合约
          </p>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center gap-4">
          {isConnected ? (
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  {walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}
                </div>
                <div className="text-xs text-gray-500">{balance} SOL</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Wallet className="h-4 w-4" />
                    已连接
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(walletAddress)}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    复制地址
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    在浏览器中查看
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={disconnectWallet}>
                    <Wallet className="h-4 w-4 mr-2" />
                    断开连接
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button
              onClick={connectWallet}
              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Wallet className="h-4 w-4" />
              连接 Reown 钱包
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
