const ICP_RECORD = "浙ICP备2025208096号-1";

type IcpRecordProps = {
  className?: string;
};

export default function IcpRecord({ className = "" }: IcpRecordProps) {
  return (
    <a
      className={`icp-record ${className}`.trim()}
      href="https://beian.miit.gov.cn/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${ICP_RECORD}，前往工业和信息化部政务服务平台查询`}
    >
      {ICP_RECORD}
    </a>
  );
}
