import { useContext } from 'react'
import i18n, { t, addResources, useTranslation, withScopedTranslations, testExports } from '~su/utilities/i18n'

import { render, screen, renderHook } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('i18n', () => {
  it('inits i18n with default options and resources', () => {
    expect(i18n).toMatchObject({
      language: testExports.DEFAULT_LANG,
      options: {
        resources: testExports.resources,
        fallbackNS: ['stage_ui'],
        debug: false,
        lng: testExports.DEFAULT_LANG,
        interpolation: {
          escapeValue: false
        }
      }
    })
  })

  describe('addResources', () => {
    it('sets default namespace' , async () => {
      await addResources({ pages: { help: { title: 'Help' }, hint: 'Testing' } }, 'jest_test')

      expect(i18n.options.defaultNS).toEqual('jest_test')
      expect(i18n.options.resources).toEqual({
        [testExports.DEFAULT_LANG]: {
          stage_ui: testExports.resources[testExports.DEFAULT_LANG].stage_ui,
          jest_test: { pages: { help: { title: 'Help' }, hint: 'Testing' } }
        }
      })
    })
  })

  describe('useTranslation hook', () => {
    it('patches react-i18next hook to pass default namespace', () => {
      const { result: translation } = renderHook(() => useTranslation())

      expect(translation.current.t('help.title')).toEqual('help.title') // not found due to missing `pages.`
      expect(translation.current.i18n).toEqual(i18n)
    })

    describe('with props', () => {
      it('passes them through to superUseTranslation', () => {
        const { result: translation } = renderHook(() => useTranslation({ keyPrefix: 'pages' }))

        expect(translation.current.t('help.title')).toEqual('Help')
        expect(translation.current.i18n).toEqual(i18n)
      })
    })

    describe('with TranslationsScope', () => {
      it('is able to use it', () => {
        const Component = () => {
          const { t } = useTranslation();
          return <div>{t('help.title')}</div>;
        };
    
        const ComponentWithScopedTranslations = withScopedTranslations(Component, 'pages')

        render(<ComponentWithScopedTranslations />)
    
        // Assert the text "Help" appears
        expect(screen.getByText('Help')).toBeInTheDocument()
      });
    
      describe('with keyPrefix passed and scope available', () => {
        it('uses the keyPrefix', () => {
          const Component = () => {
            const { t } = useTranslation({ keyPrefix: 'pages.help' })
            return <div>{t('title')}</div>;
          };
    
          const ComponentWithScopedTranslations = withScopedTranslations(Component, 'pages')

          render(<ComponentWithScopedTranslations />)
    
          // Assert the text "Help" appears
          expect(screen.getByText('Help')).toBeInTheDocument()
        });
      });
    })
  })

  describe('t', () => {
    it('is monkeypatched i18n.t', () => {
      expect(t('pages.help.title')).toEqual('Help')
    })
  })

  describe('withScopedTranslation hoc', () => {
    const buildComponent = (testedScope) => {
      return withScopedTranslations(({ children }) => {
        const { TranslationsScope } = testExports
        const scope = useContext(TranslationsScope)

        return (
          <>
            <span data-testid={`scopeValue-${testedScope}`}>{scope}</span>
            {children}
          </>
        )
      }, testedScope)
    }

    it('memoizes passed scope for the component', () => {
      const Component = buildComponent('testScope')

      const { container } = render(<Component />)

      expect(container.querySelector('[data-testid="scopeValue-testScope"]').textContent).toEqual('testScope');
    })

    it('allows for nested scopes', () => {
      const ParentComponent = buildComponent('parentScope')
      const ChildComponent = buildComponent('childScope')

      const { container } = render(<ParentComponent><ChildComponent /></ParentComponent>)

      expect(container.querySelector('[data-testid="scopeValue-parentScope"]').textContent).toEqual('parentScope');
      expect(container.querySelector('[data-testid="scopeValue-childScope"]').textContent).toEqual('parentScope.childScope');
    })

    it('handles repeating scopes', () => {
      const ParentComponent = buildComponent('parentScope')
      const ChildComponent = buildComponent('parentScope.childScope')

      const { container } = render(<ParentComponent><ChildComponent /></ParentComponent>)

      expect(container.querySelector('[data-testid="scopeValue-parentScope"]').textContent).toEqual('parentScope');
      expect(container.querySelector('[data-testid="scopeValue-parentScope.childScope"]').textContent).toEqual('parentScope.childScope');
    })

    it('handles abusively repeating scopes', () => {
      // parentScope.firstChildScope.secondChildScope.parentScope.firstChildScope.thirdChildScope

      const ParentComponent = buildComponent('parentScope')
      const FirstChildComponent = buildComponent('firstChildScope')
      const SecondChildComponent = buildComponent('secondChildScope')
      const ThirdChildComponent = buildComponent('parentScope.firstChildScope.thirdChildScope')

      const { container } = render(
        <ParentComponent>
          <FirstChildComponent>
            <SecondChildComponent>
              <ThirdChildComponent />
            </SecondChildComponent>
          </FirstChildComponent>
        </ParentComponent>
      );
    
      expect(container.querySelector('[data-testid="scopeValue-parentScope"]').textContent).toEqual('parentScope');
      expect(container.querySelector('[data-testid="scopeValue-firstChildScope"]').textContent).toEqual('parentScope.firstChildScope');
      expect(container.querySelector('[data-testid="scopeValue-secondChildScope"]').textContent).toEqual('parentScope.firstChildScope.secondChildScope');
      expect(container.querySelector('[data-testid="scopeValue-parentScope.firstChildScope.thirdChildScope"]').textContent).toEqual('parentScope.firstChildScope.secondChildScope.thirdChildScope');
    })
  })
})