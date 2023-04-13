# tedex
ted`s express stylesheets / javascripts => many companents / sample api, random images, random color, random complementary color.... etc.



| 업데이트날짜 | 내용 | 비고 |
|:----------:|:-------------:|:------:|
| 2023.02.10 | reset코드 저장 | initialize |
| 2023.02.10 | component set, layout set 저장. components 디자인 만들기 시작전, header web component 준비 |  |
| 2023.03.08 | 레이아웃 업데이트, atomic 스타일 추가 | flex_container |
| 2023.04.10 | CMS 레이아웃 추가 |  |
| 2023.04.13 | 디자인 길라잡이 추가, color 대폭 수정 및 컬러팔레트 추가 |  |
   
   
   
통합 사용법

모든 style(리셋코드, 아토믹css, 콤포넌트, 플렉스 컨테이너, 유틸css 등등) 한방에 해결 => all_in_one.css

*** root.css 종속 => typography.css, atomic.css, components_set, layouts_set

복합적 사용법 

reset code => normalized.css   
common style 적용 => common.css   
atomic style => common.css, atomic.css   
typography style => root.css, normalized.css, typography.css   
components style => root.css, components_set.css   
layouts style => common.css, layouts_set.css   