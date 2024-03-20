import DynamicIcon from '~su/components/DynamicIcon'

import { translateResponseAction, filterActionsByCondition } from '~su/components/ActionButtons/utilities'

 describe('ActionButtons utilities', () => {
   describe('translating', () => {
     describe('display property', () => {
       const types = ['link', 'function']

       describe('when action has display value', () => {
         it('uses it', () => {
           for (const type of types) {
             expect(translateResponseAction({ type, display: 'Test', options: {} }).display).toEqual('Test')
           }
         })
       })

       describe('when action does not have display value', () => {
         describe('when display can be determined from record', () => {
           it("uses that record's value", () => {
             for (const type of types) {
               const action = { type, name: 'ActionName', options: {} }
               expect(translateResponseAction(action, { record: { recName: 'RecName' }, dynamicDisplayValueName: 'recName' }).display).toEqual('RecName')
             }
           })
         })

         describe('when display cannot be determined from record', () => {
           it('falls back to action name', () => {
             for (const type of types) {
               expect(translateResponseAction({ type, name: 'ActionName', options: {} }).display).toEqual('ActionName')
             }
           })
         })
       })
     })

     describe('handling icons', () => {
       describe('when action options have icon property', () => {
         it('uses DynamicIcon for it', () => {
           expect(
             translateResponseAction({ type: 'link', display: 'Test', options: { icon: 'ReloadOutlined' } }).properties.icon
           ).toEqual(<DynamicIcon name='ReloadOutlined' />)
         })

         describe('when action options have iconOnly = true property', () => {
           it('adds a tooltip', () => {
             expect(
               translateResponseAction({ type: 'link', display: 'Test', options: { icon: 'ReloadOutlined', iconOnly: true } }).properties.tooltip
             ).toEqual('Test')
           })

           describe('when action options have tooltip property', () => {
             it('is not overwritten', () => {
               expect(
                 translateResponseAction({
                   type: 'link', display: 'Test',
                   options: { icon: 'ReloadOutlined', iconOnly: true, tooltip: 'TooltipTest' } }
                 ).properties.tooltip
               ).toEqual('TooltipTest')
             })
           })
         })
       })

       describe('when action options do not have icon property', () => {
         it('does not add icon property', () => {
           expect(
             translateResponseAction({ type: 'link', display: 'Test', options: {} }).properties
           ).not.toHaveProperty('icon')
         })

         describe('when action options have iconOnly = true property', () => {
           it('does not add a tooltip', () => {
             expect(
               translateResponseAction({ type: 'link', display: 'Test', options: { iconOnly: true } }).properties
             ).not.toHaveProperty('tooltip')
           })

           describe('when action options have tooltip property', () => {
             it('is not overwritten', () => {
               expect(
                 translateResponseAction({
                   type: 'link', display: 'Test',
                   options: { iconOnly: true, tooltip: 'TooltipTest' } }
                 ).properties.tooltip
               ).toEqual('TooltipTest')
             })
           })
         })
       })
     })

     describe('size', () => {
       describe('when provided outside of action', () => {
         describe('when action options type is link', () => {
           it('is not defined', () => {
             expect(
               translateResponseAction({ type: 'link', display: 'Test', options: { type: 'link' } }).properties.size
             ).toBe(undefined)
           })

           describe('when action options provide it', () => {
             it('is not ignored', () => {
               expect(
                 translateResponseAction({ type: 'link', display: 'Test', options: { type: 'link', size: 'small' } }).properties.size
               ).toEqual('small')
             })
           })
         })

         describe('when action options type is not link (ie is primary)', () => {
           it('is added to properties', () => {
             expect(
               translateResponseAction({ type: 'link', display: 'Test', options: {} }, { size: 'medium' }).properties.size
             ).toEqual('medium')
           })

           describe('when action options provide it too', () => {
             it('is overwritten by the action value', () => {
               expect(
                 translateResponseAction({ type: 'link', display: 'Test', options: { size: 'small' } }, { size: 'medium' }).properties.size
               ).toEqual('small')
             })
           })
         })
       })

       describe('when not provided outside of action', () => {
         it('is not defined', () => {
           expect(
             translateResponseAction({ type: 'link', display: 'Test', options: {} }).properties.size
           ).toBe(undefined)
         })

         describe('when action options provide it', () => {
           it('is not ignored', () => {
             expect(
               translateResponseAction({ type: 'link', display: 'Test', options: { size: 'small' } }).properties.size
             ).toEqual('small')
           })
         })
       })
     })

     describe('translating link action', () => {
       it("returns action's options", () => {
         const action = { type: 'link', name: 'ActionName', options: { type: 'primary' } }
         expect(translateResponseAction(action).properties).toEqual({ type: 'primary' })
       })

       describe("when options include 'href'", () => {
         describe('that contains id placeholder', () => {
           describe("with record", () => {
             it('is able to replace the id placeholder with id from a record', () => {
               const action = { type: 'link', name: 'ActionName', options: { href: '/templating/template_versions/:template_version_id/outputs' } }
               expect(translateResponseAction(action, { record: { template_version_id: 1 } }).properties).toEqual({ href:  '/templating/template_versions/1/outputs' })
             })
           })

           describe("without record", () => {
             it('creates invalid url but does not crash', () => {
               const action = { type: 'link', name: 'ActionName', options: { href: '/templating/template_versions/:template_version_id/outputs' } }
               expect(translateResponseAction(action).properties).toEqual({ href:  '/templating/template_versions/undefined/outputs' })
             })
           })

           describe('that is uri encoded', () => {
             describe('with record', () => {
               it('is able to decode the uri component and replace the id placeholder with id from a record', () => {
                 const action = { type: 'link', name: 'ActionName', options: { href: '/subscribe/new?template_id=%3Aid' } }
                 expect(translateResponseAction(action, { record: { id: 1 } }).properties).toEqual({ href:  '/subscribe/new?template_id=1' })
               })
             })

             describe('without record', () => {
               it('is is able to decode the uri component and creates invalid url but does not crash', () => {
                 const action = { type: 'link', name: 'ActionName', options: { href: '/subscribe/new?template_id=%3Aid' } }
                 expect(translateResponseAction(action).properties).toEqual({ href:  '/subscribe/new?template_id=:id' })
               })
             })
           })
         })

         describe('that does not contain id placeholder', () => {
           it('returns unmodified value', () => {
             const action = { type: 'link', name: 'ActionName', options: { href: '/templating/templates' } }
             expect(translateResponseAction(action, { record: { id: 1 } }).properties).toEqual({ href:  '/templating/templates' })
           })
         })
       })
     })

     describe('translating function action', () => {
       const mockRecord = { id: 1 }

       it("returns action's options", () => {
         const action = { type: 'function', name: 'ActionName', options: { type: 'primary' } }
         expect(translateResponseAction(action).properties).toEqual({ type: 'primary', onClick: expect.any(Function) })
       })

       it("sets onClick option to be one of functionHandlers", () => {
         const handler = (record) => record

         const action = { type: 'function', name: 'action_name', options: { type: 'primary' } }
         const translatedAction = translateResponseAction(action, { record: mockRecord, functionHandlers: { action_name: handler } })
         expect(translatedAction.properties.type).toEqual('primary')
         expect(translatedAction.properties.onClick()).toEqual(mockRecord)
       })

       describe('when onClick was passed in options', () => {
         it('is overwritten with handler', () => {
           const handler = (record) => record

           const action = { type: 'function', name: 'action_name', options: { type: 'primary', onClick: () => alert('a') } }
           const translatedAction = translateResponseAction(action, { record: mockRecord, functionHandlers: { action_name: handler } })
           expect(translatedAction.properties.type).toEqual('primary')
           expect(translatedAction.properties.onClick()).toEqual(mockRecord)
         })
       })

       describe('when handler for such function does not exist', () => {
         it('returns undefined onClick', () => {
           const action = { type: 'function', name: 'action_name', options: { type: 'primary', onClick: () => alert('a') } }
           const translatedAction = translateResponseAction(action)
           expect(translatedAction.properties.type).toEqual('primary')
           expect(translatedAction.properties.onClick()).toEqual(undefined)
         })
       })
     })

     describe.skip('translating request action', () => {
       it("returns action's options", () => {
         const action = { type: 'request', name: 'ActionName', options: { type: 'primary' } }
         expect(translateResponseAction(action).properties).toEqual({ type: 'primary', onClick: expect.any(Function) })
       })

       it("does not return action's method and path options", () => {
         const action = { type: 'request', name: 'ActionName', options: { type: 'primary', method: 'GET', path: '/test' } }
         const translatedAction = translateResponseAction(action)
         expect(translatedAction.properties.method).toEqual(undefined)
         expect(translatedAction.properties.path).toEqual(undefined)
       })

       it("sets onClick option to be a function calling one of requestHandlers with request options and passed data", () => {
         const handler = (requestOptions, data) => {
           return { requestOptions, data }
         }

         const action = { type: 'request', name: 'action_name', options: { type: 'primary', method: 'GET', path: '/test' } }
         expect(
           translateResponseAction(action, { requestHandlers: { action_name: handler } }).properties.onClick({ id: 1 })).toEqual({
             requestOptions: { method: 'GET', path: '/test' },
             data: { id: 1 }
           }
         )
       })

       describe('when onClick was passed in options', () => {
         it('is overwritten', () => {
           const handler = (requestOptions, data) => {
             return { requestOptions, data }
           }

           const action = { type: 'request', name: 'action_name', options: { method: 'GET', path: '/test', onClick: () => alert('a') } }
           expect(
             translateResponseAction(action, { requestHandlers: { action_name: handler } }).properties.onClick({ id: 1 })).toEqual({
               requestOptions: { method: 'GET', path: '/test' },
               data: { id: 1 }
             }
           )
         })
       })

       describe('when handler for such request does not exist', () => {
         it('returns undefined onClick', () => {
           const action = { type: 'request', name: 'action_name', options: { type: 'primary', onClick: () => alert('a') } }
           expect(translateResponseAction(action).properties.onClick()).toEqual(undefined)
         })
       })
     })
   })

   describe('filterActionsByCondition', () => {
     describe('when action does not have condition property', () => {
       it('keeps it in', () => {
         const action = { name: 'test', type: 'link' }
         const record = { state: 'test' }

         expect(filterActionsByCondition([action], record)).toEqual([action])
       })
     })

     describe('when action has condition property', () => {
       describe('when condition is null', () => {
         it('keeps the action in', () => {
           const action = { name: 'test', type: 'link', condition: null }
           const record = { state: 'test' }

           expect(filterActionsByCondition([action], record)).toEqual([action])
         })
       })

       describe('when condition is an empty array', () => {
         it('keeps the action in but logs', () => {
           global.console = { error: jest.fn() }

           const action = { name: 'test', type: 'link', condition: [] }
           const record = { state: 'test' }

           expect(filterActionsByCondition([action], record)).toEqual([action])
           expect(console.error).toBeCalledWith('filterActionsByCondition failed with TypeError: operatorFunction is not a function')
         })
       })

       describe('when condition is an object', () => {
         it.only('keeps the action in but logs', () => {
           global.console = { error: jest.fn() }

           const action = { name: 'test', type: 'link', condition: {} }
           const record = { state: 'test' }

           expect(filterActionsByCondition([action], record)).toEqual([action])
           expect(console.error).toBeCalledWith('filterActionsByCondition failed with TypeError: Invalid attempt to destructure non-iterable instance.\n' +
             'In order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
         })
       })

       describe('when operator is not supported', () => {
         it('keeps the action in but logs', () => {
           global.console = { error: jest.fn() }

           const action = { name: 'test', type: 'link', condition: ['state', 'fakeOperator', 'test'] }
           const record = { state: 'test' }

           expect(filterActionsByCondition([action], record)).toEqual([action])
           expect(console.error).toBeCalledWith('fakeOperator is unknown')
         })
       })

       describe('when condition is valid', () => {
         const actions = [
           { name: 'test', type: 'link', condition: ['state', 'eql', 'test'] },
           { name: 'test', type: 'link', condition: ['state', 'notEql', 'anothest'] },
           { name: 'test', type: 'link', condition: ['visit_count', 'lt', 11] },
           { name: 'test', type: 'link', condition: ['visit_count', 'gt', 9] },
           { name: 'test', type: 'link', condition: ['state', 'in', ['test']] },
         ]
         const record = { state: 'test', visit_count: 10 }

         describe('when operatorName is eql', () => {
           it('returns the action when recordValue is equal to conditionValue', () => {
             expect(filterActionsByCondition(actions, record)).toEqual(actions[0])
           })
         })

         describe('when operatorName is notEql', () => {
           it('returns the action when recordValue is not equal to conditionValue', () => {
             expect(filterActionsByCondition(actions, record)).toEqual(actions[1])
           })
         })

         describe('when operatorName is lt', () => {
           it('returns the action when recordValue less than conditionValue', () => {
             expect(filterActionsByCondition(actions, record)).toEqual(actions[3])
           })
         })

         describe('when operatorName is gt', () => {
           it('returns the action when recordValue greater than conditionValue', () => {
             expect(filterActionsByCondition(actions, record)).toEqual(actions[2])
           })
         })

         describe('when operatorName is in', () => {
           it('returns the action when conditionValue includes recordValue', () => {
             expect(filterActionsByCondition(actions, record)).toEqual(actions[4])
           })
         })
       })
     })
   })
 })
