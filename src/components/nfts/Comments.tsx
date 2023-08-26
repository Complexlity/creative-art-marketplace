import { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'



interface CommentsProps {

}

const Comments: FC<CommentsProps> = ({}) => {

    return (
        <section className="related-items grid gap-12 text-center">
      <h2 className="relative  text-3xl tracking-wide md:text-4xl">
        Comments
        <span className="absolute bottom-[-.3rem] right-[50%] h-[.15rem] w-[20%] max-w-[180px] translate-x-[50%] bg-primary"></span>
      </h2>
      <div >
          {/* User Avatar */}
          <Avatar>
  <AvatarImage src="https://github.com/shadcn.png" />
  <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          

        {/* Auto sizeable text area */}
        {/* Comment Buttton */}
      </div>
      {/* Comments */}
      <div>
        <div>
          {/* User Avatar  + User Name*/}
          {/* Time  */}
        </div>
        <div>
          {/* Comment */}
        </div>
        <div>
          {/* Upvote button + count */}
          {/* Downvote button + Count */}
        </div>
      </div>
    </section>
    )
}

export default Comments