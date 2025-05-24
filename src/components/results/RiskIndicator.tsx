
import { CheckCircle, AlertTriangle, XCircle, Shield } from 'lucide-react';

interface RiskIndicatorProps {
  riskLevel: 'Low' | 'Medium' | 'High';
}

const RiskIndicator = ({ riskLevel }: RiskIndicatorProps) => {
  switch (riskLevel) {
    case 'Low':
      return <CheckCircle className="h-8 w-8 text-green-400" />;
    case 'Medium':
      return <AlertTriangle className="h-8 w-8 text-yellow-400" />;
    case 'High':
      return <XCircle className="h-8 w-8 text-red-400" />;
    default:
      return <Shield className="h-8 w-8 text-cyan-400" />;
  }
};

export default RiskIndicator;
