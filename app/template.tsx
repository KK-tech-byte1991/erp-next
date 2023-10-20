import Header from "./components/common/HeaderComponent/Header"
export default function Template({ children }: { children: React.ReactNode }) {
    return <div>
        <Header/>
        <div className="wrapPaddingBox">
        {children}</div>
        </div>
  }