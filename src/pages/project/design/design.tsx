import DeviceScreen from'./deviceScreen';
import LeftPanel from './leftPanel';
import RightPanel from './rightPanel';
import { ContextProviderDesign } from 'hooks/context/design';
import './design.scss';
import './updateCode';

export default function Design() {
    return (
        <ContextProviderDesign>
            <div className="mainZone">
                <DeviceScreen />
                <LeftPanel />
                <RightPanel />
            </div>
        </ContextProviderDesign>
    );
}