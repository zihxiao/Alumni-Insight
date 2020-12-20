/* eslint-disable no-unused-vars */
import React from 'react';
import URLSearchParams from 'url-search-params';
import { Pagination, Row, Col, Panel} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


// import Filter from './Filter/containers/Filter';
import SchoolTable from './SchoolTable.jsx';
import SchoolAdd from './SchoolAdd.jsx';
import SchoolFilter from './SchoolSearch.jsx';
import SchoolSearch from './SchoolFilter.jsx';
import graphQLFetch from './graphQLFetch.js';
import ProfilePageHeader from './components/Headers/ProfilePageHeader.jsx';
import withToast from './withToast.jsx';


const SECTION_SIZE = 5;

function PageLink({
  params, page, activePage, children,
}) {
  params.set('page', page);
  if (page === 0) return React.cloneElement(children, { disabled: true });
  return (
    <LinkContainer
      isActive={() => page === activePage}
      to={{ search: `?${params.toString()}` }}
    >
      {children}
    </LinkContainer>
  );
}

class SchoolList extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = {};
    if (params.get('name')) vars.name = params.get('name');
    if (params.get('state')) vars.state = params.get('state');
    if (params.get('zip')) vars.zip = params.get('zip');

    const ratingMin = parseInt(params.get('ratingMin'), 10);
    if (!Number.isNaN(ratingMin)) vars.ratingMin = ratingMin;
    const ratingMax = parseInt(params.get('ratingMax'), 10);
    if (!Number.isNaN(ratingMax)) vars.ratingMax = ratingMax;


    // const { params: { id } } = match;
    // const idInt = parseInt(id, 10);

    let page = parseInt(params.get('page'), 10);
    if (Number.isNaN(page)) page = 1;
    vars.page = page;

    const query = `query schoolList(
      $state: StateType
      $zip: String
      $page: Int
    ) {
      schoolList(
        state: $state
        zip: $zip
        page: $page
      ) {
        schools {
          id name address state zip
          website
        }
        pages
      }
    }`;

    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor() {
    super();
    const initialData = { schoolList: {} };
    const {
      schoolList: { schools, pages },
    } = initialData;
    this.state = {
      schools,
      pages,
    };
    this.createSchool = this.createSchool.bind(this);
    this.deleteSchool = this.deleteSchool.bind(this);
  }

  componentDidMount() {
    const { schools } = this.state;
    if (schools == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
      match: { params: { id: prevId } },
    } = prevProps;
    const { location: { search }, match: { params: { id } } } = this.props;
    if (prevSearch !== search || prevId !== id) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search }, match, showError } = this.props;
    const data = await SchoolList.fetchData(match, search, showError);
    if (data) {
      this.setState({
        schools: data.schoolList.schools,
        pages: data.schoolList.pages,
      });
    }
  }

  async createSchool(school) {
    const { showError } = this.props;
    const query = `mutation schoolAdd($school: SchoolInputs!) {
      schoolAdd(school: $school) {
        id
      }
    }`;

    const data = await graphQLFetch(query, { school }, showError);
    if (data) {
      const { history } = this.props;
      history.push(`/edit/${data.schoolAdd.id}`);
      this.loadData();
    }
  }

  async deleteSchool(index) {
    const query = `mutation schoolDelete($id: Int!) {
      schoolDelete(id: $id)
    }`;
    alert(index);
    const { schools } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = schools[index];
    const data = await graphQLFetch(query, { id: parseInt(id, 10) } );
    if (data && data.schoolDelete) {
      this.setState((prevState) => {
        const newList = [...prevState.schools];
        if (pathname === `/schools/${id}`) {
          history.push({ pathname: '/schools', search });
        }
        newList.splice(index, 1);
        return { schools: newList };
      });
    } else {
      this.loadData();
    }
  }


  render() {
    const { schools } = this.state;
    if (schools == null) return null;

    const { pages } = this.state;
    const { location: { search } } = this.props;

    const params = new URLSearchParams(search);
    let page = parseInt(params.get('page'), 10);
    if (Number.isNaN(page)) page = 1;

    const startPage = Math.floor((page - 1) / SECTION_SIZE) * SECTION_SIZE + 1;
    const endPage = startPage + SECTION_SIZE - 1;
    const prevSection = startPage === 1 ? 0 : startPage - SECTION_SIZE;
    const nextSection = endPage >= pages ? 0 : startPage + SECTION_SIZE;

    const items = [];
    for (let i = startPage; i <= Math.min(endPage, pages); i += 1) {
      params.set('page', i);
      items.push((
        <PageLink key={i} params={params} activePage={page} page={i}>
          <Pagination.Item>{i}</Pagination.Item>
        </PageLink>
      ));
    }

    const listStyle = {
      marginLeft: 100,
      marginRight: 100,
    }

    return (
      <div style={listStyle}>
        <React.Fragment>     
          <ProfilePageHeader />
          <h1>University DataBase</h1>
          <Panel>
            <Panel.Heading>
              <Panel.Title toggle>Filter and Search</Panel.Title>
            </Panel.Heading>
            <Panel.Body >
              <SchoolFilter />
            </Panel.Body>
            <Panel.Body >
              <SchoolSearch />
            </Panel.Body>
          </Panel>
          <hr />
          <SchoolTable schools={schools} deleteSchool={this.deleteSchool} />
          <hr />
          <SchoolAdd createSchool={this.createSchool} />
          <hr />
          <Pagination>
            <PageLink params={params} page={prevSection}>
              <Pagination.Item>{'<'}</Pagination.Item>
            </PageLink>
            {items}
            <PageLink params={params} page={nextSection}>
              <Pagination.Item>{'>'}</Pagination.Item>
            </PageLink>
          </Pagination>
        </React.Fragment>
      </div>
    );
  }
}



export default withToast(SchoolList);