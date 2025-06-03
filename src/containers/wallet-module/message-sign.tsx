"use client";

import { PenLine } from "lucide-react";
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
import { useRef } from "react";
import { useAppKitProvider } from "@reown/appkit/react";
import type { Provider } from "@reown/appkit-adapter-solana/react";

export default function MessageSign() {
  const ref = useRef<HTMLInputElement>(null);
  const { isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  // Get the wallet provider with the AppKit hook

  // AppKit hook to get the address and check if the user is connected

  async function handleSign() {
    if (!ref.current) return;

    // message to sign
    const encodedMessage = new TextEncoder().encode(ref.current.value);

    // Raise the modal
    const sig = await walletProvider.signMessage(encodedMessage);

    // Print the signed message in hexadecimal format
    console.log(Buffer.from(sig).toString("hex"));
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PenLine className="h-5 w-5 text-amber-500" />
          消息签名
        </CardTitle>
        <CardDescription>使用钱包对消息内容进行签名</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="message">消息内容</Label>
          <Input
            id="message"
            ref={ref}
            placeholder="输入需要签名的消息"
            disabled={!isConnected}
          />
        </div>
        <Button className="w-full" disabled={!isConnected} onClick={handleSign}>
          <PenLine className="h-4 w-4 mr-2" />
          签名消息
        </Button>
      </CardContent>
    </Card>
  );
}
