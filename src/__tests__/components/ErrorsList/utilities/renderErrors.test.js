import React from 'react'

import renderErrors from '~su/components/ErrorsList/utilities/renderErrors'
import { List, ListItem } from '~su/components/ErrorsList/index.styled'

describe('renderErrors', () => {
  it('renders string error', () => {
    expect(renderErrors({ creator: 'is missing' })).toEqual([
      <ListItem key="creator">Creator is missing</ListItem>
    ])
  })

  it('renders array of errors', () => {
    expect(renderErrors({ state: ['is missing'] })).toEqual([
      <ListItem key="state">State is missing</ListItem>
    ])
  })

  it('renders nested error object', () => {
    expect(renderErrors({ template_version: { state: ['is missing'] } })).toEqual([
      <ListItem key="template_version">
        <React.Fragment>
          Template version:<List>{[<ListItem key="state">State is missing</ListItem>]}</List>
        </React.Fragment>
      </ListItem>
    ])
  })

  it('renders object error with number key (for dynamic FieldsList) and capitalizes first letter', () => {
    expect(renderErrors({ schedules: { 0: ['outside of months days'] } })).toEqual([
      <ListItem key="schedules">
        <React.Fragment>
          Schedules:<List>{[<ListItem key="0">Outside of months days</ListItem>]}</List>
        </React.Fragment>
      </ListItem>
    ])
  })

  it('renders object error with number key and object value (for dqynamic FieldsList) and capitalizes first letter', () => {
    expect(renderErrors({ code: { parameters: { 0: { required: ['is missing'] } } } })).toEqual([
      <ListItem key="code">
        <React.Fragment>
          Code:
            <List>
              {[
                <ListItem key="parameters">
                  <React.Fragment>
                    Parameters:
                    <List>
                      {[
                        <ListItem key="0">
                          <React.Fragment>
                            0:
                            <List>
                              {[<ListItem key="required">Required is missing</ListItem>]}
                            </List>
                          </React.Fragment>
                        </ListItem>
                      ]}
                    </List>
                  </React.Fragment>
                </ListItem>
              ]}
            </List>
        </React.Fragment>
      </ListItem>
    ])
  })
})
