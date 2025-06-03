import { networks } from "@/constants/reown-config";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAppKit, useAppKitNetwork } from "@reown/appkit/react";

interface ISwitchNetworkProps {
  nativeUI?: boolean;
}

export default function SwitchNetwork({ nativeUI }: ISwitchNetworkProps) {
  const { caipNetwork, switchNetwork } = useAppKitNetwork();
  const { open } = useAppKit();

  if (nativeUI) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => {
          open({ view: "Networks" });
        }}
      >
        <img
          src={caipNetwork?.assets?.imageUrl}
          alt={caipNetwork?.name}
          className="w-4 h-4"
        />
        <span>{caipNetwork?.name}</span>
      </Button>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <img
            src={caipNetwork?.assets?.imageUrl}
            alt={caipNetwork?.name}
            className="w-4 h-4"
          />
          <span>{caipNetwork?.name}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>切换网络</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {networks.map((network) => (
            <Button
              key={network.id}
              variant="ghost"
              className={cn(
                "flex items-center justify-between",
                caipNetwork?.id === network.id && "bg-accent"
              )}
              onClick={() => {
                switchNetwork(network);
              }}
            >
              <div className="flex items-center gap-2">
                <span>{network.name}</span>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
