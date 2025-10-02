interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
  const getBadgeStyle = () => {
    if (score > 70) {
      return {
        bgClass: "bg-green-100",
        textClass: "text-green-600",
        label: "Strong"
      };
    } else if (score > 49) {
      return {
        bgClass: "bg-yellow-100",
        textClass: "text-yellow-600", 
        label: "Good Start"
      };
    } else {
      return {
        bgClass: "bg-red-100",
        textClass: "text-red-600",
        label: "Needs Work"
      };
    }
  };

  const { bgClass, textClass, label } = getBadgeStyle();

  return (
    <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${bgClass}`}>
      <p className={textClass}>{label}</p>
    </div>
  );
};

export default ScoreBadge;