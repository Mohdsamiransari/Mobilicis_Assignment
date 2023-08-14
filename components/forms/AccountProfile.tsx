'use client'

import { UserValidation } from "@/lib/validations/User";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from 'react-hook-form';
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import Image from 'next/image'
import { Textarea } from "../ui/textarea";
import { ChangeEvent, useState } from "react";
import { useUploadThing } from "@/lib/uploadThing";
import { usePathname, useRouter } from "next/navigation";
import { isBase64Image } from "@/lib/utils";
import { updateUser } from "@/lib/actions/user.action";



interface Props {
  user:{
    id:string;
    objectId: string;
    username: string;
    bio: string;
    image:string;
    email:string
  }
  btnTitle: string;
}

export const AccountProfile = ({user, btnTitle}:Props) => {
  const [ files, setFiles] = useState<File[]>([])
  const {startUpload} = useUploadThing('media')
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: user?.image||"",
      username: user?.username||"",
      emailAddresses:"" || user?.email,
      phone_number: 1,
      bio:user?.bio||""
      
    },
  })

  const handleImage =(e : ChangeEvent<HTMLInputElement> , fieldChange:(value: string)=> void)=>{

    e.preventDefault()
    const fileReader = new FileReader()

    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0]

      setFiles(Array.from(e.target.files))

      if(!file.type.includes('image')) return;

      fileReader.onload = async (event) =>{
        const imageDataUrl = event.target?.result?.toString() || "";

        fieldChange(imageDataUrl);
      }

      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async (values: z.infer<typeof UserValidation>)=> {
    const blob = values.profile_photo

    const hasImageChanged = isBase64Image(blob);

    if(hasImageChanged){
      const imgRes = await startUpload(files)
      if (imgRes && imgRes[0].fileUrl){
        values.profile_photo = imgRes[0].fileurl
      }
    }
    
    await updateUser({
      userId:user.id,
      username: values.username,
      image: values.profile_photo,
      bio: values.bio,
      email: values.emailAddresses,
      phone_number: values.phone_number,
      path: pathname
    })
    if(pathname === '/profile/edit'){
      router.back();
      
    }else{
      router.push('/')
    }
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    <FormField
        control={form.control}
        name="profile_photo"
        render={({ field }) => (
          <FormItem className="flex items-center">
            <FormLabel className="flex h-24 w-24 items-center justify-center rounded-full">
              {field.value?<Image
                    src={field.value}
                    alt='Profile photo'
                    width={96}
                    height={96}
                    className='rounded-full object-contain'
                  />:(
                    <Image
                    src="/assets/profile.svg"
                    alt='Profile photo'
                    width={96}
                    height={96}
                    className='rounded-full object-contain'
                  />)}
            </FormLabel>
            <FormControl>
              <Input 
                type="file" 
                accept='image/'
                placeholder='upload a photo'
                className="cursor-pointer border-none bg-transparent outline-none file:text-blue"
                onChange={(e)=> handleImage(e, field.onChange)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormLabel>UserName</FormLabel>
            <FormControl>
              <Input type="text" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="emailAddresses"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone_number"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input type="number" {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>bio</FormLabel>
            <FormControl>
              <Textarea rows={15} {...field}/>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}
