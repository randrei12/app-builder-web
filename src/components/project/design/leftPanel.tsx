import 'scss/components/project/design/leftPanel.scss';

export default function LeftPanel() {
    return (
        <div className="leftElements">
            <div className="organisationPanel">
                <div className="top">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Layout</span>
                </div>
                <div className="container">
                    <button>shit1</button>
                    <button>shit2</button>
                    <button>shit3</button>
                </div>
            </div>
            <div className="elementsPanel">
                <div className="top">
                    <i className="fa-solid fa-angle-right"></i>
                    <span>Elements</span>
                </div>
                <div className="container" style={{ borderBottom: "none" }}>
                    <button data-type="text">Text</button>
                    <button data-type="button">Button</button>
                    <button data-type="image">Image</button>
                </div>
            </div>
        </div>
    );
}