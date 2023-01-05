import DeviceScreen from'./deviceScreen';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';
import './design.scss';

export default function Design() {
    return (
        <div className="mainZone">
            <DeviceScreen />
            <LeftPanel />
            <RightPanel />
        </div>
    );
}