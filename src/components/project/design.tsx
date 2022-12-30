import DeviceScreen from'./design/deviceScreen';
import LeftPanel from './design/leftPanel';
import RightPanel from './design/rightPanel';
import 'ts/pages/project/main';
import 'scss/components/project/design.scss';

export default function Design() {
    return (
        <div className="mainZone">
            <DeviceScreen />
            <LeftPanel />
            <RightPanel />
        </div>
    );
}