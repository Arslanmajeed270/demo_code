import React from 'react'
import { useUpdate } from 'react-use'
import { IFontsDisplayed } from '.'
import { getNewTCCOObjectBase } from '../MagicCanvas/template'
import { onDragStartFabricObject } from '../MagicSidePanel/components/utils'
import { Property } from 'csstype'
import { FabricObject } from '@lib/graphql'

interface IMagicFontProps {
  font: IFontsDisplayed
  handleFontStyle: (
    fontFamily: string,
    weight?: Property.FontWeight,
    italic?: boolean,
  ) => void
}

export const MagicFontItem: React.FC<IMagicFontProps> = ({
  font: { font, italic, weight },
  handleFontStyle,
}) => {
  const update = useUpdate()
  const baseTCCO = getNewTCCOObjectBase()
  const tcooObject: FabricObject = {
    ...baseTCCO,
    name: `Text (${baseTCCO._id.substring(baseTCCO._id.length - 3)})`,
    type: `i-text`,
    fill: `#000000`,
    text: `Edit this sample text`,
    fontFamily: font.family,
    fontSize: 40,
    fontStyle: italic ? `italic` : `normal`,
    fontWeight: weight ? weight : `normal`,
    styles: { '/': {} },
    textAlign: `left`,
    underline: false,
    overline: false,
    linethrough: false,
    lineHeight: 1,
    ...({ shadow: {} } as any), // TODO fix this by fixing rxjs, as it make issue on timeline drag first time
  }

  return (
    <div className="h-auto rounded-md border-2 mt-2">
      <select
        className="float-right mt-1 mr-2 text-gray-700 py-1 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        name="variants"
        onChange={(e) =>
          handleFontStyle(
            font.family,
            e.target.value as Property.FontWeight,
            italic,
          )
        }
      >
        {font.variants.map((variant, key) => (
          <>
            {variant.indexOf(`italic`) < 0 && (
              <option
                key={key}
                value={variant === `regular` ? `normal` : variant}
                selected={variant === `regular`}
              >
                {variant === `regular` ? `Regular` : variant}
              </option>
            )}
            )
          </>
        ))}
        <option value="bold">Bold</option>
      </select>
      {font.variants.includes(`italic`) && (
        <i
          onClick={() => handleFontStyle(font.family, weight, !italic)}
          className={`${
            italic ? `fas fa-italic` : `fal fa-italic`
          } float-right mt-3 mr-2  m-1 text-gray-400 cursor-pointer transform duration-300 ease-in-out hover:scale-110`}
        ></i>
      )}
      <div
        style={{
          fontFamily: font.family,
          fontStyle: italic && `italic`,
          fontSize: `24px`,
          fontWeight: weight,
        }}
        onDragStart={onDragStartFabricObject(tcooObject)}
        onDragEnd={update}
        data-type={`font`}
        draggable={true}
        className="p-4 cursor-pointer"
      >
        {font.family}
      </div>
    </div>
  )
}
