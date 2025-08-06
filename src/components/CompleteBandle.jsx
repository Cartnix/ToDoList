import { CheckOutlined } from '@ant-design/icons';

export default function completeBundle() {
    return (
        <div style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            width: '32px',
            height: '32px',
            backgroundColor: '#52c41a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            color: 'white',
            fontSize: '18px',
        }}>
            <CheckOutlined />
        </div>
    )
}