/* eslint-disable quotes */
interface ISocialMediaShareLinks {
  'add.this': string
  buffer: string
  blogger: string
  diaspora: string
  douban: string
  email: string
  evernote: string
  getpocket: string
  facebook: string
  flattr: string
  flipboard: string
  gmail: string
  'google.bookmarks': string
  instapaper: string
  'line.me': string
  linkedin: string
  livejournal: string
  'hacker.news': string
  'ok.ru': string
  pinterest: string
  qzone: string
  reddit: string
  renren: string
  skype: string
  sms: string
  'surfingbird.ru': string
  'telegram.me': string
  threema: string
  tumblr: string
  twitter: string
  vk: string
  weibo: string
  whatsapp: string
  xing: string
  yahoo: string
}

type ISocialMediaShareLinksValidArgs =
  | `url`
  | `title`
  | `image`
  | `desc`
  | `appid`
  | `redirecturl`
  | `via`
  | `hashtags`
  | `provider`
  | `language`
  | `userid`
  | `category`
  | `phonenumber`
  | `emailaddress`
  | `ccemailaddress`
  | `bccemailaddress`

interface ISocialMediaShareLinksOptions {
  url?: string
  title?: string
  image?: string
  desc?: string
  appid?: string
  redirecturl?: string
  via?: string
  hashtags?: string
  provider?: string
  language?: string
  userid?: string
  category?: string
  phonenumber?: string
  emailaddress?: string
  ccemailaddress?: string
  bccemailaddress?: string
}

export const getSocialMediaShareLinks = (
  options: ISocialMediaShareLinksOptions,
): ISocialMediaShareLinks => {
  const validargs: ISocialMediaShareLinksValidArgs[] = [
    `url`,
    `title`,
    `image`,
    `desc`,
    `appid`,
    `redirecturl`,
    `via`,
    `hashtags`,
    `provider`,
    `language`,
    `userid`,
    `category`,
    `phonenumber`,
    `emailaddress`,
    `ccemailaddress`,
    `bccemailaddress`,
  ]

  for (let i = 0; i < validargs.length; i++) {
    const validarg = validargs[i]
    if (!options[validarg]) options[validarg] = ``
  }

  const url = fixedEncodeURIComponent(options.url)
  const title = fixedEncodeURIComponent(options.title)
  const image = fixedEncodeURIComponent(options.image)
  const desc = fixedEncodeURIComponent(options.desc)
  const app_id = fixedEncodeURIComponent(options.appid)
  const redirect_url = fixedEncodeURIComponent(options.redirecturl)
  const via = fixedEncodeURIComponent(options.via)
  const hash_tags = fixedEncodeURIComponent(options.hashtags)
  const provider = fixedEncodeURIComponent(options.provider)
  const language = fixedEncodeURIComponent(options.language)
  const user_id = fixedEncodeURIComponent(options.userid)
  const category = fixedEncodeURIComponent(options.category)
  const phone_number = fixedEncodeURIComponent(options.phonenumber)
  const email_address = fixedEncodeURIComponent(options.emailaddress)
  const cc_email_address = fixedEncodeURIComponent(options.ccemailaddress)
  const bcc_email_address = fixedEncodeURIComponent(options.bccemailaddress)

  let text = title

  if (desc) {
    text += `%20%3A%20` // This is just this, " : "
    text += desc
  }

  return {
    'add.this': `http://www.addthis.com/bookmark.php?url=` + url,
    blogger:
      `https://www.blogger.com/blog-this.g?u=` +
      url +
      `&n=` +
      title +
      `&t=` +
      desc,
    buffer: `https://buffer.com/add?text=` + text + `&url=` + url,
    diaspora:
      `https://share.diasporafoundation.org/?title=` + title + `&url=` + url,
    douban: `http://www.douban.com/recommend/?url=` + url + `&title=` + text,
    email: `mailto:` + email_address + `?subject=` + title + `&body=` + desc,
    evernote:
      `https://www.evernote.com/clip.action?url=` + url + `&title=` + text,
    getpocket: `https://getpocket.com/edit?url=` + url,
    facebook: `http://www.facebook.com/sharer.php?u=` + url,
    flattr:
      `https://flattr.com/submit/auto?user_id=` +
      user_id +
      `&url=` +
      url +
      `&title=` +
      title +
      `&description=` +
      text +
      `&language=` +
      language +
      `&tags=` +
      hash_tags +
      `&hidden=HIDDEN&category=` +
      category,
    flipboard:
      `https://share.flipboard.com/bookmarklet/popout?v=2&title=` +
      text +
      `&url=` +
      url,
    gmail:
      `https://mail.google.com/mail/?view=cm&to=` +
      email_address +
      `&su=` +
      title +
      `&body=` +
      url +
      `&bcc=` +
      bcc_email_address +
      `&cc=` +
      cc_email_address,
    'google.bookmarks':
      `https://www.google.com/bookmarks/mark?op=edit&bkmk=` +
      url +
      `&title=` +
      title +
      `&annotation=` +
      text +
      `&labels=` +
      hash_tags +
      ``,
    instapaper:
      `http://www.instapaper.com/edit?url=` +
      url +
      `&title=` +
      title +
      `&description=` +
      desc,
    'line.me': `https://lineit.line.me/share/ui?url=` + url + `&text=` + text,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=` + url,
    livejournal:
      `http://www.livejournal.com/update.bml?subject=` + text + `&event=` + url,
    'hacker.news':
      `https://news.ycombinator.com/submitlink?u=` + url + `&t=` + title,
    'ok.ru':
      `https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl=` + url,
    pinterest: `http://pinterest.com/pin/create/button/?url=` + url,
    qzone:
      `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=` + url,
    reddit: `https://reddit.com/submit?url=` + url + `&title=` + title,
    renren:
      `http://widget.renren.com/dialog/share?resourceUrl=` +
      url +
      `&srcUrl=` +
      url +
      `&title=` +
      text +
      `&description=` +
      desc,
    skype: `https://web.skype.com/share?url=` + url + `&text=` + text,
    sms: `sms:` + phone_number + `?body=` + text,
    'surfingbird.ru':
      `http://surfingbird.ru/share?url=` +
      url +
      `&description=` +
      desc +
      `&screenshot=` +
      image +
      `&title=` +
      title,
    'telegram.me':
      `https://t.me/share/url?url=` +
      url +
      `&text=` +
      text +
      `&to=` +
      phone_number,
    threema: `threema://compose?text=` + text + `&id=` + user_id,
    tumblr:
      `https://www.tumblr.com/widgets/share/tool?canonicalUrl=` +
      url +
      `&title=` +
      title +
      `&caption=` +
      desc +
      `&tags=` +
      hash_tags,
    twitter:
      `https://twitter.com/intent/tweet?url=` +
      url +
      `&text=` +
      text +
      `&via=` +
      via +
      `&hashtags=` +
      hash_tags,
    vk:
      `http://vk.com/share.php?url=` +
      url +
      `&title=` +
      title +
      `&comment=` +
      desc,
    weibo:
      `http://service.weibo.com/share/share.php?url=` +
      url +
      `&appkey=&title=` +
      title +
      `&pic=&ralateUid=`,
    whatsapp: `https://api.whatsapp.com/send?text=` + text + `%20` + url,
    xing: `https://www.xing.com/spi/shares/new?url=` + url,
    yahoo:
      `http://compose.mail.yahoo.com/?to=` +
      email_address +
      `&subject=` +
      title +
      `&body=` +
      text,
  }
}

const fixedEncodeURIComponent = (str: string) => {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return `%` + c.charCodeAt(0).toString(16)
  })
}
