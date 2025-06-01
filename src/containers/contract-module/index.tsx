"use client";

import { Calculator, Plus, Trash2 } from "lucide-react";
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
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NFTTabProps {
  isConnected: boolean;
}

export default function ContractModule({ isConnected }: NFTTabProps) {
  const [counterValue, setCounterValue] = useState(0);
  return (
    <div className="space-y-6">
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
    </div>
  );
}
