import React from 'react'

const RightSideBar = () => {
  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="">New Members</h3>
      </div>
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="">Expire Soon</h3>
      </div>
    </section>
  )
}

export default RightSideBar