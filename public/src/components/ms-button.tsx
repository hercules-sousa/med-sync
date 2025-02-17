import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface MsButtonProps extends ButtonProps {
  isLoading?: boolean;
}

const MsButton = (props: MsButtonProps) => {
  return (
    <Button {...props} disabled={props.isLoading}>
      {props.isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        props.children
      )}
    </Button>
  );
};

export default MsButton;
