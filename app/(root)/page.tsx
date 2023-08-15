


import { EditBio } from "@/components/profile/EditBio";
import { EditName } from "@/components/profile/EditName";
import { EditNumber } from "@/components/profile/EditNumber";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import { redirect } from "next/navigation";



export default async function Home() {
  const user = await currentUser();
  if(!user) return null
  const userInfo = await fetchUser(user?.id)
    
    const userData = {
        id: user?.id,
        objectId: userInfo?._id,
        username: userInfo?.username || user?.username,
        bio: userInfo.bio || "",
        image: userInfo?.image || user?.imageUrl,
        email: user?.emailAddresses[0].emailAddress
    };


  return (
    <section className=" z-20 flex h-screen w-full flex-col justify-between overflow-auto pt-24 pb-10 px-6 relative">
      <div className="bg-blue-800 rounded-lg w-full h-44 text-white text-sm p-4"> MY PROFILE</div>
      <div className=" shadow-md md:w-11/12 w-10/12 h-fit absolute left-0 right-0 mx-auto top-44 rounded-lg">
        <div className="flex flex-col lg:flex-row md:gap-0 gap-4 h-full">


          <div className="lg:w-1/2 w-full flex flex-col gap-4 p-4 md:p-10 justify-between bg-gray-100">
            <div>
              <div>
                <Image src={userInfo.image} alt="Profile" width={100} height={100} className="rounded-full"/>
              </div>
            </div>
            <div className="border w-full h-fit p-4 flex flex-col gap-4">
              <div>
                <h4 className="text-sm">Your Name</h4>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{user?.username}</p>
                 <EditName/>
                  
                </div>
              </div>
              <div>
                <h4 className="text-sm">Email</h4>
                <p className="font-semibold">{userInfo.email}</p>
              </div>
              <div>
                <h4 className="text-sm">Phone Number</h4>
                <div className="flex justify-between items-center">
                  <p className="font-semibold">{userInfo.phone_number}</p>
                  <EditNumber/>
                </div>
              </div>
            </div>
            <div className="border w-full h-fit p-4">
                <div className="flex flex-row justify-between items-center mb-4">
                  <h2 className="text-xl ">About <span className="text-blue-700">{user?.lastName}</span></h2>
                  <EditBio 
                    user={userData}
                    btnTitle="Continue"
                  />
                </div>
                <p className="md:text-md text-sm">{userInfo.bio}</p>
            </div>
            <div>
            
            </div>
          </div>




          <div className="lg:w-1/2 w-full h-full p-4 md:p-10  flex  justify-end bg-gray-100">
            <div className="flex flex-col gap-6 h-full lg:w-4/5 w-full ">
              <div className="border rounded-xl p-4">
                <h3 className="mb-4 font-semibold">Professional Details</h3>
                <p>These are the professional details shown to users in the app. </p>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <h3 className="font-semibold">Certifications</h3>
                  <button>edit</button>
                </div>
                <div className="border  rounded-full p-4 flex flex-col gap-2 items-center ">
                    <h3>Python</h3>
                    <p>Coding Ninja</p>
                </div>
              </div>
              <div>
                <div className="flex flex-row items-center justify-between mb-4">
                  <h3 className="font-semibold">Experience</h3>
                  <button>edit</button>
                </div>
                <div className="border  rounded-xl p-4 flex flex-col gap-2  mb-4 ">
                    <div className="flex flex-row justify-between items-center font-semibold">
                      <h4 >7 years (2014-2021) </h4>
                      <h4 >Full-time</h4>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>Oruphones </p>
                      <p>-- Full Stack Developer </p>
                    </div>
                    
                </div>
                <div className="border  rounded-xl p-4 flex flex-col gap-2  mb-4 ">
                    <div className="flex flex-row justify-between items-center font-semibold">
                      <h4>7 years (2014-2021) </h4>
                      <h4>Full-time</h4>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                      <p>Oruphones </p>
                      <p>-- Full Stack Developer </p>
                    </div>  
                </div> 
              </div>
              <div>4</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
