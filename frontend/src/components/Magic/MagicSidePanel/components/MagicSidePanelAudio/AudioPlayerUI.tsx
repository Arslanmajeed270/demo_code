import { addNewClipObjectToTemplate } from '@components/Magic/MagicCanvas/canvas'
import { getNewTCCOBase } from '@components/Magic/MagicCanvas/template'
import { GqlMagicEMAudios_magicEMAudios } from '@lib/gqlTypes/emz'
import { RootState } from '@redux/reducers'
import ObjectID from 'bson-objectid'
import { ReactElement, Dispatch } from 'react'
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { IMagicSidePanelListComponentProps } from '../..'

interface IAudioPlayerUIProps extends IMagicSidePanelListComponentProps {
  audio: GqlMagicEMAudios_magicEMAudios
  playingAudioRef: HTMLAudioElement
  setPlayingAudioRef: Dispatch<React.SetStateAction<HTMLAudioElement>>
}

export const AudioPlayerUI = ({
  audio,
  playingAudioRef,
  setPlayingAudioRef,
  template,
  updateTemplateFromClip,
}: IAudioPlayerUIProps): ReactElement => {
  const { t } = useTranslation(`magic`)
  const {
    magicTimeline: { currentFrame },
    magicTemplate: { activeTemplateClipId },
  } = useSelector((state: RootState) => state)

  const baseTCCO = getNewTCCOBase()
  const tcooObject: fabric.IAudioOptions = {
    ...baseTCCO,
    name: `Audio (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
    type: `audio`,
    src: audio.uri,
    crossOrigin: `anonymous`,
    mediaStartAt: 0,
    muteMedia: false,
    mediaVolume: 1,
  }

  const onAdd = () => {
    const object = {
      ...tcooObject,
      _id: new ObjectID().toString(),
    }

    addNewClipObjectToTemplate(
      object,
      currentFrame,
      template,
      activeTemplateClipId,
      updateTemplateFromClip,
    )
  }

  const onAudioPlay = (e) => {
    if (playingAudioRef && playingAudioRef !== e.target) {
      playingAudioRef.pause()
    }
    setPlayingAudioRef(e.target)
  }
  return (
    <AudioPlayer
      autoPlay={false}
      src={audio.uri}
      header={
        <div className="flex gap-2 items-center">
          <p className="float-left truncate w-full">{audio.title} </p>
          <div
            className="cursor-pointer w-16 rounded-lg bg-primary-500 text-center px-4 py-2"
            onClick={onAdd}
          >
            <span className="text-white">{t(`add`)}</span>
          </div>
        </div>
      }
      customProgressBarSection={[
        RHAP_UI.PROGRESS_BAR,
        RHAP_UI.CURRENT_TIME,
        <div> &nbsp; : &nbsp; </div>,
        RHAP_UI.DURATION,
      ]}
      onPlay={onAudioPlay}
      loop={true}
      layout="horizontal-reverse"
      showJumpControls={false}
      customAdditionalControls={[]}
      customIcons={{ play: <i className="fas fa-sm fa-play-circle"></i> }}
      customVolumeControls={[]}
    />
  )
}
