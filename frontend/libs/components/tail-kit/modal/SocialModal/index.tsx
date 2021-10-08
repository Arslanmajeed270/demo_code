import { FC } from 'react'
import { Modal, InputText } from '@lib/components'
import { getSocialMediaShareLinks } from './utils'
import { copyToClipboard } from '@lib/utils'

export interface ISocialMediaIcons {
  platform: string
  icon: JSX.Element
  className: string
}

export interface ISocialModalProps {
  url: string
  showModal: boolean
  setShowModal: (param: boolean) => void
}

const socialIconsArray: ISocialMediaIcons[] = [
  {
    platform: `facebook`,
    icon: <i className="fa fa-facebook text-xl" />,
    className: `hover:bg-blue-500 border-2 border-blue-500 text-blue-500`,
  },
  {
    platform: `whatsapp`,
    icon: <i className="fa fa-whatsapp text-xl" />,
    className: `hover:bg-green-500 border-2 border-green-500 text-green-500`,
  },
  {
    platform: `twitter`,
    icon: <i className="fa fa-twitter text-xl" />,
    className: `hover:bg-blue-500 border-2 border-blue-500 text-blue-500`,
  },
  {
    platform: `gmail`,
    icon: <i className="fa fa-envelope-o text-xl"></i>,
    className: `hover:bg-red-500 border-2 border-red-500 text-red-500`,
  },
  {
    platform: `linkedin`,
    icon: <i className="fa fa-linkedin" />,
    className: `hover:bg-blue-500 border-2 border-blue-500 text-blue-500`,
  },
]

export const SocialModal: FC<ISocialModalProps> = (props) => {
  return (
    <>
      {props.showModal && (
        <Modal hideModal={() => props.setShowModal(false)} title="Share">
          <h3 className="text-gray-700">Share this via link</h3>
          <div className="flex justify-center gap-3 mt-5">
            {socialIconsArray.map((item: ISocialMediaIcons, idx) => {
              return (
                <a
                  key={idx}
                  href={
                    getSocialMediaShareLinks({
                      url: props.url,
                    })[item.platform]
                  }
                  target="_blank"
                >
                  <div
                    className={`${item.className} flex justify-center items-center rounded-lg cursor-pointer hover:text-white py-3 px-4`}
                  >
                    {item.icon}
                  </div>
                </a>
              )
            })}
          </div>
          <h3 className="my-5 text-gray-700">or Copy Link</h3>
          <div className="flex">
            <InputText
              className="rounded-none"
              name="search"
              type="text"
              placeholder={`url`}
              square={true}
              disabled={true}
              defaultValue={props.url}
            />
            <div
              className="flex justify-center cursor-pointer items-center bg-primary px-4  hover:bg-primary-700 focus:ring-primary-500 focus:ring-offset-primary-200"
              onClick={() => copyToClipboard(props.url)}
            >
              <i className="fa fa-clone text-white" aria-hidden="true"></i>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}
