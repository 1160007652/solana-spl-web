import { Wallet } from "lucide-react";

export default function ContentTips() {
  return (
    <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
      <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
        <Wallet className="h-5 w-5" />
        <span className="font-medium">请先连接钱包以使用所有功能</span>
      </div>
    </div>
  );
}
