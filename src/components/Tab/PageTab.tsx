import { useNavigate } from "react-router-dom";

interface PageTabProps {
  tabName: string;
  url: string;
  onDelete: (url: string) => void;
}

export default function PageTab({ tabName, url, onDelete }: PageTabProps) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(url);
  };
  return (
    <div>
      <span onClick={onClick}>{tabName}</span>
      <button onClick={() => onDelete(url)}>X</button>
    </div>
  );
}
