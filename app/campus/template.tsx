import CampusProvider from "./campus-provider"



export default function Template({ children, params }: { children: React.ReactNode, params: any }) {
    return <div>
         {children}
    </div>
}