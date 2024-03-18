import ace from 'ace-builds'

const generateMacrosRegex = (macros) => {
  const macroCodes = macros.map((macro) => {
    let code = macro.code

    macro.meta.parameters
      .map((parameter, index) => `\${${index + 1}:${parameter}}`)
      .forEach((toBeReplaced) => {
        code = code.replace(toBeReplaced, '\\d+')
      })

    return code
  })

  return new RegExp(macroCodes.join('|'))
}

const buildExtendedKeywordMatcher = (highlightRules) => {
  const baseKeywordMapper = highlightRules.$rules.start.find(({ token }) => typeof token === 'function')

  const functions =
    'abs,all_keys_match,any_keys_match,any_values_match,approx_distinct,approx_percentile,approx_set,arbitrary,array_agg,array_distinct,array_intersect,array_join,' +
    'array_max,array_min,array_position,array_remove,array_sort,array_union,bitwise_and_agg,bitwise_or_agg,bitwise_xor_agg,bool_and,bool_or,cardinality,cbrt,ceil,ceiling,' +
    'checksum,chi_squared_cdf,concat,contains,corr,cosine_similarity,count_if,covar_pop,covar_samp,cume_dist,current_date,current_time,date_add,date_diff,date_format,date_parse,' +
    'date_trunc,day,degrees,dense_rank,element_at,entropy,every,filter,first_value,flatten,floor,from_unixtime,from_utf8,hamming_distance,histogram,if,key_sampling_percent,' +
    'khyperloglog_agg,kurtosis,lag,last_value,lead,length,levenshtein_distance,lower,lpad,map,map_agg,map_concat,map_entries,map_filter,map_from_entries,map_keys,map_normalize,' +
    'map_remove_null_values,map_subset,map_top_n,map_top_n_keys,map_top_n_values,map_union,map_union_sum,map_values,map_zip_with,max_by,merge,min_by,month,multimap_agg,' +
    'no_keys_match,no_values_match,noisy_count_gaussian,noisy_count_if_gaussian,normalize,nth_value,ntile,numeric_histogram,percent_rank,position,qdigest_agg,random,reduce,' +
    'reduce_agg,regexp_extract,regexp_extract_all,regexp_like,regexp_replace,regexp_split,regr_intercept,regr_slope,replace,reverse,round,row_number,rpad,sequence,set_agg,' +
    'set_union,skewness,slice,split,split_part,sqrt,starts_with,stddev,stddev_pop,stddev_samp,strpos,substr,to_utf8,trail,transform,transform_keys,transform_values,trim,truncate,' +
    'try,upper,url_decode,url_encode,url_extract_fragment,url_extract_host,url_extract_parameter,url_extract_path,url_extract_port,url_extract_protocol,url_extract_query,var_pop,' +
    'var_samp,variance,word_stem,year,zip,zip_with,||'

  const extendedKeywordMapper = highlightRules.createKeywordMapper({ 'support.function': functions }, null, true, ',')

  return (value) => extendedKeywordMapper(value) || baseKeywordMapper.token(value)
}

const buildCustomHighlightRules = (highlightRules) => {
  const extendedKeywordMapper = buildExtendedKeywordMatcher(highlightRules)

  return {
    start: [
      {
        token: 'string',
        regex: "'.*?'"
      },
      {
        token: 'string.alias',
        regex: '".*?"'
      },
      {
        token: 'support.function',
        regex: '\\|\\|'
      },
      {
        token: extendedKeywordMapper,
        regex: '[a-zA-Z_$][a-zA-Z0-9_$]*\\b'
      }
    ]
  }
}

// This only defines high-level behaviour of the Mode like folding etc.
ace.define(
  'ace/mode/fp_sql',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/sql', 'ace/mode/fp_sql_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const SqlMode = acequire('ace/mode/sql').Mode
    const FpSqlHighlightRules = acequire('ace/mode/fp_sql_highlight_rules').FpSqlHighlightRules

    const Mode = function () {
      this.HighlightRules = FpSqlHighlightRules
    }

    oop.inherits(Mode, SqlMode) // ACE's way of doing inheritance

    exports.Mode = Mode // eslint-disable-line no-param-reassign
  }
)

// This is where we really create the highlighting rules
ace.define(
  'ace/mode/fp_sql_highlight_rules',
  ['require', 'exports', 'ace/lib/oop', 'ace/mode/sql_highlight_rules'],
  (acequire, exports) => {
    const oop = acequire('ace/lib/oop')
    const SqlHighlightRules = acequire('ace/mode/sql_highlight_rules').SqlHighlightRules

    const FpSqlHighlightRules = function FpSqlHighlightRules() {
      this.$keywordList = new SqlHighlightRules().$keywordList
      // Use SQl's rules as a base
      this.$rules = new SqlHighlightRules().getRules()

      this.addRules({
        start: [...buildCustomHighlightRules(this).start, ...this.$rules.start]
      })

      this.addMacroRule = (macros, session) => {
        this.addRules({
          start: [
            ...this.$rules.start,
            {
              token: 'string.macro',
              regex: generateMacrosRegex(macros)
            }
          ]
        })

        session.$mode.$tokenizer = null
        session.bgTokenizer.setTokenizer(session.$mode.getTokenizer())
        session.bgTokenizer.start(0)
      }
    }

    oop.inherits(FpSqlHighlightRules, SqlHighlightRules)

    exports.FpSqlHighlightRules = FpSqlHighlightRules
  }
)

let testExports = {}
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV == 'test') {
  testExports = { generateMacrosRegex, buildExtendedKeywordMatcher, buildCustomHighlightRules }
}

export { testExports }
