import SideBar from "@/components/component/side-bar";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <SideBar>
        {children}
    </SideBar>
  );
}
