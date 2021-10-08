import { EmeezoVideoStatus } from '@lib/gqlTypes/emz'

interface IVideoTableActionsProps {
  status?: EmeezoVideoStatus
  url?: string
  shareActionHandler?: (url: string) => void
  downloadActionHandler?: () => void
  deleteActionHandler?: () => void
}
export const VideoTableActions: React.FC<IVideoTableActionsProps> = (props) => {
  return (
    <div className="flex flex-nowrap justify-center">
      <i
        className={`fa fa-share hover:text-primary text-gray-700 cursor-pointer`}
        onClick={() => props.shareActionHandler(props.url)}
      />
      {props.status === EmeezoVideoStatus.COMPLETED ? (
        <i
          className="fa fa-download text-gray-700 mx-2 hover:text-green-500 cursor-pointer"
          onClick={props.downloadActionHandler}
        />
      ) : (
        <i className="fa fa-download text-gray-400 mx-2 cursor-not-allowed" />
      )}
      {props.status === EmeezoVideoStatus.ERROR ||
      props.status === EmeezoVideoStatus.COMPLETED ? (
        <i
          className="fa fa-trash text-gray-700 hover:text-red-500 cursor-pointer"
          onClick={props.deleteActionHandler}
        />
      ) : (
        <i className="fa fa-trash text-gray-400 cursor-not-allowed" />
      )}
    </div>
  )
}
