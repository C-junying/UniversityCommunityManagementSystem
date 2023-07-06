import React, { useEffect, useState } from 'react'
import { Descriptions, Tag, Image } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '@/utils/http'
import { dateFormat } from '@/utils/time'
import HeanderTitle from '../other/HeanderTitle'

export default function ActivityPriview() {
  // 返回上一层
  const navigate = useNavigate()
  const [applyActivityInfo, setApplyActivityInfo] = useState(null)
  const [teacherInfo, setTeacherInfo] = useState(null)
  //   获取链接数据
  const params = useParams()
  const auditList = [
    <Tag color="processing">审核中</Tag>,
    <Tag color="success">已通过</Tag>,
    <Tag color="error">未通过</Tag>,
  ]
  const activityStateList = [
    <Tag color="processing">未发布</Tag>,
    <Tag color="success">已发布</Tag>,
    <Tag color="error">已结束</Tag>,
  ]
  useEffect(() => {
    http.post('/activity/activityIdApplyActivity', params).then((res) => {
      http.post('/teacher/clubIdTeacher', { clubId: res.data.data[0]['activity_id'] }).then((teacher) => {
        setApplyActivityInfo(res.data.data[0])
        setTeacherInfo(teacher.data.data[0])
      })
    })
  }, [params])
  return (
    <div>
      {applyActivityInfo && (
        <div>
          <HeanderTitle onBack={() => navigate(-1)} title={applyActivityInfo.name} />
          <Descriptions size="small" column={3} bordered>
            <Descriptions.Item label="申请者" style={{ width: 200 }}>
              {applyActivityInfo['user_name']}
            </Descriptions.Item>
            <Descriptions.Item label="社团名称">{applyActivityInfo['club_name']}</Descriptions.Item>
            <Descriptions.Item label="活动名称">{applyActivityInfo['activity_title']}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {dateFormat(applyActivityInfo['apply_time'])}
            </Descriptions.Item>
            <Descriptions.Item label="申请理由">{applyActivityInfo['apply_content']}</Descriptions.Item>
            <Descriptions.Item label="申请场地">{applyActivityInfo['area_name']}</Descriptions.Item>
            <Descriptions.Item label="审核状态">
              {auditList[applyActivityInfo['apply_state']]}
            </Descriptions.Item>
            <Descriptions.Item label="发布状态">
              {activityStateList[applyActivityInfo['activity_state']]}
            </Descriptions.Item>
            <Descriptions.Item label="活动类型">{applyActivityInfo['type_name']}</Descriptions.Item>

            <Descriptions.Item label="申请金额" span={3}>
              {applyActivityInfo['money']}
            </Descriptions.Item>

            <Descriptions.Item label="指导老师" span={1}>
              {teacherInfo['user_name']}
            </Descriptions.Item>
            <Descriptions.Item label="指导老师电话" span={1}>
              {teacherInfo['phone']}
            </Descriptions.Item>
            <Descriptions.Item label="老师职位" span={1}>
              {teacherInfo['position']}
            </Descriptions.Item>
            <Descriptions.Item label="活动开始时间" span={1}>
              {dateFormat(applyActivityInfo['start_time'])}
            </Descriptions.Item>
            <Descriptions.Item label="活动结束时间" span={1}>
              {dateFormat(applyActivityInfo['end_time'])}
            </Descriptions.Item>
            <Descriptions.Item label="活动面向群体" span={1}>
              {applyActivityInfo['activity_look'] === applyActivityInfo['club_id'] ? '本社团' : '全校'}
            </Descriptions.Item>
            <Descriptions.Item label="活动代表图" span={3}>
              <Image
                width={250}
                height={150}
                src={applyActivityInfo.picture}
                fallback="data:image/png;base64,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"
              />
            </Descriptions.Item>
            <Descriptions.Item label="活动介绍" span={3}>
              {applyActivityInfo['activity_intro']}
            </Descriptions.Item>
            <Descriptions.Item label="活动内容" span={3}>
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: applyActivityInfo['activity_content'],
                  }}
                  style={{
                    margin: '0 24px',
                  }}></div>
              }
            </Descriptions.Item>
            <Descriptions.Item
              label="活动总结"
              span={3}
              style={{
                display: applyActivityInfo['activity_state'] === 2 ? '' : 'none',
              }}>
              {
                <div
                  dangerouslySetInnerHTML={{
                    __html: applyActivityInfo['activity_report'],
                  }}
                  style={{
                    margin: '0 24px',
                  }}></div>
              }
            </Descriptions.Item>
            <Descriptions.Item label="回复内容" span={3}>
              {applyActivityInfo.reply}
            </Descriptions.Item>
            <Descriptions.Item label="回复时间">
              {applyActivityInfo['reply_time'] && dateFormat(applyActivityInfo['reply_time'])}
            </Descriptions.Item>
          </Descriptions>
        </div>
      )}
    </div>
  )
}
