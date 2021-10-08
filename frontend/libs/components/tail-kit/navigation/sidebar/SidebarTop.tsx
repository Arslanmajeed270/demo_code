export interface SideBarTopProps {
  children?: React.ReactNode
  imgSrc: string
}

export const SideBarTop: React.FC<SideBarTopProps> = (props) => {
  return (
    <nav className="block md:hidden bg-gray-800 relative">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:hidden w-full">
          <div className="order-first">{props.children}</div>
          <img
            className="object-cover h-10 order-2000"
            src={props.imgSrc}
            alt="logo"
          />
          <div className="order-last r-only"></div>
        </div>
      </div>
    </nav>
  )
}
