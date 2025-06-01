"use client";

import { Fragment, useEffect, useState } from "react";
import { KeyRound, Coins, Settings, FileCode } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WalletModule from "@/containers/wallet-module";
import SplTokensModule from "@/containers/spl-token-module";
import SplManageModule from "@/containers/spl-manage-module";
import ContractModule from "@/containers/contract-module";
import ContentTips from "@/containers/content-tips";
import { useAppKitAccount } from "@reown/appkit/react";

export default function Home() {
  const [tabValue, setTabValue] = useState("wallet");
  const { isConnected } = useAppKitAccount();

  useEffect(() => {
    if (!isConnected) {
      setTabValue("wallet-unconnect");
    }
  }, [isConnected]);
  return (
    <Tabs
      defaultValue={tabValue}
      onValueChange={setTabValue}
      className="w-full"
    >
      <TabsList className="grid grid-cols-4 mb-8 gap-3">
        <TabsTrigger value="wallet" className="flex items-center gap-2">
          <KeyRound className="h-4 w-4" />
          <span className="hidden sm:inline">钱包管理</span>
          <span className="sm:hidden">钱包</span>
        </TabsTrigger>
        <TabsTrigger value="spl-token" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span className="hidden sm:inline">代币操作</span>
          <span className="sm:hidden">代币</span>
        </TabsTrigger>
        <TabsTrigger value="spl-manage" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">权限管理</span>
          <span className="sm:hidden">权限</span>
        </TabsTrigger>
        <TabsTrigger value="contract" className="flex items-center gap-2">
          <FileCode className="h-4 w-4" />
          <span className="hidden sm:inline">合约操作</span>
          <span className="sm:hidden">合约</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="wallet">
        <WalletModule isConnected={isConnected} />
      </TabsContent>

      <TabsContent value="spl-token">
        <SplTokensModule isConnected={isConnected} />
      </TabsContent>

      <TabsContent value="spl-manage">
        <SplManageModule isConnected={isConnected} />
      </TabsContent>

      <TabsContent value="contract">
        <ContractModule isConnected={isConnected} />
      </TabsContent>

      <TabsContent value="wallet-unconnect">
        <ContentTips />
      </TabsContent>
    </Tabs>
  );
}
