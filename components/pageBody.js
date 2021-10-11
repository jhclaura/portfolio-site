import markdownStyles from './markdown-styles.module.css'
import BlockContent from '@sanity/block-content-to-react'
import { sanityConfig } from '../lib/config'

export default function PageBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <BlockContent
        blocks={content}
        className={markdownStyles.markdown}
        projectId={sanityConfig.projectId}
        dataset={sanityConfig.dataset}
      />
    </div>
  )
}
