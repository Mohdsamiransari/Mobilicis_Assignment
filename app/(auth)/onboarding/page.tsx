import { AccountProfile } from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.action";
import { currentUser,  } from "@clerk/nextjs";
async function Page(){
    const user = await currentUser();
    
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
        <main className="mx-auto flex max-w-3xl flex-col justify-center px-10 py-20">
            <h1 className="head-text">Onboarding</h1>
            <p className="mt-3 text-base-regular text-light-1">
                Complete your profile now to use threads
            </p>

            <section className="mt-9 bg-dark-2 p-10">
                <AccountProfile 
                    user={userData}
                    btnTitle="Continue"
                />
            </section>
        </main>
    )
}

export default Page;