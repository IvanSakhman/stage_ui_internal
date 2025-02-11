import { Switch as AntdSwitch } from 'antd'
import Space from './Space'
import Typography from './Typography'

const { Text, Paragraph } = Typography

const Switch = ({ title, description, ...rest }) => {
  return (
    <Space align="center" size="large">
      <AntdSwitch {...rest} />
      {(title || description) && (
        <div>
          {title && <Text strong>{title}</Text>}
          {description && (
            <Paragraph type="secondary" style={{ margin: 0 }}>
              {description}
            </Paragraph>
          )}
        </div>
      )}
    </Space>
  )
}

export default Switch
