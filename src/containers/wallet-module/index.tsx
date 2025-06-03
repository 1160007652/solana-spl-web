import CreateWallet from "./create-wallet";
import TransferSol from "./transfer-sol";
import AirdropSol from "./airdrop-sol";
import MessageSign from "./message-sign";

export default function WalletModule() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <CreateWallet />
      <TransferSol />
      <AirdropSol />
      <MessageSign />
    </div>
  );
}
