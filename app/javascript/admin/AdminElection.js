import React, { useEffect, useState } from 'react'
import { Map as ImmMap } from 'immutable'
import { fetchGet } from '../util/fetch_helpers'
import LoadingSection from '../util/LoadingSection'
import Hero from '../util/Hero'
import { Link, NavLink, useParams, Switch, Route } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { StateTag, VisibilityTag } from './tags'
import ElectionView from './ElectionView'
import ElectionEdit from './ElectionEdit'

const TabLink = React.forwardRef(({ children, className, href }, ref) => (
  <li className={className}><Link to={href} ref={ref}>{children}</Link></li>
))

const AdminElection = () => {
  const { slug } = useParams()
  const [election, setElection] = useState(ImmMap())
  const [loading, setLoading] = useState(true)
  const basePath = `/admin/elections/${slug}`

  useEffect(() => {
    fetchGet(`/api/admin/elections/${slug}`)
      .then(res => setElection(res))
      // TODO: Show error message
      .finally(() => setLoading(false))
  }, [slug])

  return (
    <LoadingSection loading={loading}>
      <Hero title={election.get('name')} style="danger" />
      <section className="section">
        <div className="container">
          <div className="tabs">
            <ul>
              <NavLink to={basePath} activeClassName="is-active" exact component={TabLink}>
                View
              </NavLink>
              <NavLink to={`${basePath}/edit`} activeClassName="is-active" exact component={TabLink}>
                Edit
              </NavLink>
              <NavLink to={`${basePath}/tokens`} activeClassName="is-active" exact component={TabLink}>
                Tokens
              </NavLink>
            </ul>
          </div>
          <Switch>
            <Route exact path={basePath}>
              <ElectionView election={election} />
            </Route>
            <Route exact path={`${basePath}/edit`}>
              <ElectionEdit election={election} setElection={setElection} />
            </Route>
            <Route exact path={`${basePath}/tokens`}>
              <div />
            </Route>
          </Switch>
        </div>
      </section>
    </LoadingSection>
  )

}

export default AdminElection
