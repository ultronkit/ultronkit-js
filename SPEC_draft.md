# UltronKit: UNIVERSAL RUNTIME SPECIFICATION (MISSION-CRITICAL)

> [!IMPORTANT]
> **CONTEXT ANCHOR (기억 소거 대비 점검 사항):**
>
> 1. **Zero Toolchain:** 빌드 도구 없이 브라우저 단독 구동. (npx serve 만 가능)
> 2. **Audit Barrier:** 모든 코드는 `verify` 알고리즘(13장)에 따른 선택 티어(Tier 1: 30줄/80자/CX:10, Tier 3: 10줄/70자/CX:2)의 규칙을 1비트의 오차 없이 통과해야 함.
> 3. **Conceptual Separation:** 변수/제어문/반환 블록 간 정확히 1줄 빈 줄 필수. 중괄호 Zero Padding 엄수.
> 4. **Mutual Assurance:** 장부(Registry)와 실체(Code)의 1:1 일치 보증. (Ghost/Shadow 감지)
> 5. **Law over King:** 코딩 전 반드시 이 명세서를 먼저 읽고 집행할 것.
> 6. **Comment Ban:** 헤더 주석 외 모든 주석(내부 설명, 좀비 코드 등)은 즉시 패닉 사유.

**Version:** 0.0.0 (Space-Grade Alpha)
**Target:** Mission-Critical Browser Applications (Chromium-based Runtime)
**Inspired By:** NASA Power of 10, MISRA C:2012, SEI CERT, CWE/SANS Top 25, WCAG 2.1

> **Disclaimer:** This specification adopts principles from aerospace/safety-critical standards for browser-based JavaScript. It is not formally certified to these standards. Target benchmark: SpaceX Crew Dragon GUI (Chromium + JS).

---

## 1. 서론 (Introduction)

본 문서는 외부 빌드 도구 및 라이브러리 의존성을 0으로 제거하고, **런타임 엔진(Runtime Engine) 단독으로** 최신 모던 웹 프레임워크의 모든 기능을 제공하며, 동시에 **인명 보호 및 시스템 무결성**을 최우선으로 하는 엄격한 **임무 중심형 모놀리스 커널(Mission-Critical Monolith Kernel)**의 기술 요구사항을 정의한다.
이는 단순한 웹 앱이 아닌, **실패가 용납되지 않는(Zero-Failure) 환경**을 위한 운영체제 레벨의 플랫폼이다.
시스템은 계층적 구조(Layered Architecture)를 가지며, 각 Layer는 하위 Layer에만 의존해야 한다.

### 1.1. 제로 툴체인 선언 (Zero Toolchain Manifesto)

본 커널은 **브라우저 외 어떤 런타임, 빌드 도구, 패키지 관리자도 요구하지 않는다.** 개발자의 작업 환경은 오직 **텍스트 에디터 + 브라우저 + 로컬 HTTP 서버**만으로 구성된다.

#### 절대 금지 (Hard Ban)

| 카테고리              | 금지 항목                                         | 대체 방안            |
| --------------------- | ------------------------------------------------- | -------------------- |
| **런타임**            | Node.js, Deno, Bun                                | 브라우저             |
| **패키지 관리**       | npm, yarn, pnpm (의존성 설치)                     | CDN URL              |
| **빌드 도구**         | Webpack, Vite, Rollup, Parcel, Turbopack, esbuild | 없음 (직접 실행)     |
| **트랜스파일러**      | Babel, SWC, TypeScript 컴파일러                   | 순수 JavaScript      |
| **번들러**            | 모든 번들러                                       | Monolithic Unity     |
| **린터/포매터**       | ESLint, Prettier                                  | Kernel Audit Barrier |
| **테스트 프레임워크** | Jest, Mocha, Vitest                               | Policy.invariant()   |
| **정적 분석**         | TypeScript 타입 검사                              | SPEC 문서 + Audit    |

### 1.3. 단일 파일 아키텍처 (Monolithic Unity)

시스템의 무결성과 감사 가능성을 극대화하기 위해 아래의 단일 파일 원칙을 엄격히 준수한다.

- **Kernel Monolith:** `ultronkit.js`는 모든 서브시스템을 포함하는 단일 파일로 존재한다. 외부 모듈 분할이나 동적 임포트를 절대 금지한다.
- **App Monolith:** `app.js`는 Sovereign API를 통한 모든 애플리케이션 정의를 포함하는 단일 파일로 존재한다.
- **Zero Fragment Strategy:** 파일 분할 및 번들링 과정을 원천 제거함으로써, '작성한 코드가 즉시 실행되는 코드'라는 투명성을 보장한다.

| 항목                  | 조건                        |
| --------------------- | --------------------------- |
| **외부 라이브러리**   | CDN URL로만, 버전 명시 필수 |
| **로컬 HTTP 서버**    | 개발 시 `npx serve` 수준    |
| **브라우저 DevTools** | 디버깅용                    |

#### 근거 (Rationale)

1. **의존성 = 부채**: npm 패키지는 매주 보안 패치, 매년 breaking change가 발생한다.
2. **빌드 = 지연**: 저장 → 빌드 → 새로고침 대신 저장 → 새로고침.
3. **도구 = 복잡성**: 설정 파일 수십 개가 코드보다 길어지는 것은 허용되지 않는다.
4. **브라우저가 런타임**: 1995년에도 됐고, 2025년에도 된다.

### 1.4. 언어/런타임 강제 메커니즘 (Language Enforcement)

커널은 JavaScript 언어와 브라우저 런타임의 내장 메커니즘을 최대한 활용하여 **별도 검증 없이도 위반이 불가능한 구조**를 강제한다.

#### 컴파일 타임 강제 (Static Enforcement)

| 메커니즘                     | 강제 효과                          | 활용                       |
| ---------------------------- | ---------------------------------- | -------------------------- |
| **TDZ (Temporal Dead Zone)** | `const`/`let` 선언 전 참조 불가    | Tier 의존성 순서 강제      |
| **Strict Mode**              | 암묵적 전역 금지, silent fail 방지 | 파일 최상단 `"use strict"` |

#### 런타임 강제 (Runtime Enforcement)

| 메커니즘                 | 강제 효과                    | 활용                  |
| ------------------------ | ---------------------------- | --------------------- |
| **Object.freeze()**      | 객체 불변성                  | State 읽기 전용 뷰    |
| **Proxy**                | 속성 접근 가로채기           | Domain 직접 호출 차단 |
| **Private Fields** (`#`) | 진짜 private (클래스 없이도) | 커널 내부 상태 보호   |

#### Proxy를 통한 Domain 격리

```javascript
const StateModule = new Proxy(_StateModule, {
  get: function fnGet(t, p) {
    if (!isKernelContext()) panic("E_DIRECT_DOMAIN_ACCESS");
    return t[p];
  },
});
```

#### 코드 배치로 인한 물리적 강제

```
파일 시작 (위)
├─ L0: Foundation → 먼저 선언, 모든 곳에서 참조 가능
├─ L1: Infrastructure → L0만 참조 가능 (L2는 아직 TDZ)
├─ L2: Domains → L0+L1 참조 가능
└─ L2: Kernel → 모두 참조 가능
파일 끝 (아래)
```

> **원칙:** 위에서 아래로 참조만 가능. 아래에서 위로 참조 시 JavaScript 자체가 `ReferenceError` 발생.

---

## 2. 런타임 코드 무결성 및 감사 시스템 (Runtime Integrity & Audit)

커널은 애플리케이션 초기화 단계에서 사용자 코드를 정적/동적으로 분석하여 다음 기준을 만족하지 못할 경우 부팅을 즉시 차단(Audit Failure)한다.

### 2.1. 실시간 린트 및 스타일 강제 (Absolute Audit Barrier)

커널 부팅 시 모든 함수와 객체를 정적 분석하여 아래 규칙을 1비트라도 위반하면 즉시 커널 패닉을 발동한다.

#### 1. 물리적 제약 (Physical Constraints)

| 규칙            | 값              | 설명                                         | 보고 필수 정보                            |
| --------------- | --------------- | -------------------------------------------- | ----------------------------------------- |
| **Line Limit**  | **정책별 차등** | Tier 1: 30줄 / Tier 3: 10줄 (함수 본문 기준) | 총 라인 수 / 제한치                       |
| **Width Limit** | **정책별 차등** | Tier 1/2: 80자 / Tier 3: 70자                | **위반된 줄 번호 (LN:), 실제 너비 (WD:)** |
| **Depth Limit** | **2단계**       | 최대 들여쓰기 깊이 (Indent: 2 spaces)        | **위반된 줄 번호 (LN:), 글자 위치 (CH:)** |
| **Complexity**  | **정책별 차등** | Tier 1: 10 / Tier 2: 5 / Tier 3: 2           | 총 복잡도 수 / 제한치 (CX:)               |

> [!IMPORTANT]
> **위치 및 구문 보고 강제 (Precise Reporting):** 모든 위반 사항은 반드시 해당 위반이 발생한 **줄 번호(LN:)**, **캐릭터 위치(CH:)**, 그리고 **해당 라인의 소스 코드 스니펫(Snippet:)**을 정확히 식별하여 보고해야 한다. (예: `BANNED_TOKEN: LN:12, CH:45, TK:"++", Snippet: "count += 1++"`)

#### 2. 절대 블랙리스트 (Absolute Blacklist - NEVER allowed)

아래 항목은 커널 및 앱 전체에서 사용이 원천 금지되며, 발견 시 즉시 부팅이 차단된다.

##### 키워드 금지

| 금지 키워드  | 이유                     |
| ------------ | ------------------------ |
| `var`        | 호이스팅, 함수 스코프    |
| `class`      | 가짜 OOP, 상속 복잡성    |
| `this`       | 컨텍스트 의존, 예측 불가 |
| `with`       | 스코프 오염              |
| `arguments`  | rest parameters로 대체   |
| `delete`     | 객체 형태 변형           |
| `void`       | 불필요                   |
| `in`         | `hasOwnProperty` 사용    |
| `instanceof` | 타입 검사 불안정         |
| `yield`      | Generator 금지           |

##### 연산자 금지

| 금지 연산자       | 이유                                   |
| ----------------- | -------------------------------------- |
| `==`, `!=`        | 타입 강제 변환, `===`/`!==` 사용       |
| `++`, `--`        | 부작용 있는 표현식, `+= 1`/`-= 1` 사용 |
| `,` (쉼표 연산자) | 가독성 저하                            |
| `?` (삼항 연산자) | 가독성 저하, if-else 강제              |

##### 문법 금지

| 금지 문법                  | 이유                                   |
| -------------------------- | -------------------------------------- |
| `=>` (화살표 함수)         | 전통적 `function` 선언만 허용          |
| **중첩 함수 (Nested)**     | 모든 함수는 최상위 레벨에서 정의 필수  |
| **인라인 콜백 (Inline)**   | 콜백은 항상 이름 있는 함수 참조만 허용 |
| **축약어 명명**            | `rt`, `v`, `o`, `e` 등 금지. 실명 사용 |
| **메서드 체이닝 2개 초과** | `a.b().c().d()` 금지                   |
| **인라인 콜백**            | 이름 있는 함수 참조만 허용             |
| **동적 프로퍼티**          | `obj[key]` 금지, `pick(obj, key)` 사용 |
| **`prototype` 조작**       | 예측 불가                              |
| **삼항 연산자**            | `cond ? a : b` 금지, `if`문 필수       |

##### 포맷팅 금지 (Formatter Blacklist)

| 금지 패턴                 | 위반 예시                | 허용 패턴 (Multi-line)         |
| ------------------------- | ------------------------ | ------------------------------ |
| **One-Liner (단문 제어)** | `if (c) return;`         | `if (c) { \n return; \n }`     |
| **Inline Block**          | `function() { return; }` | `function() { \n return; \n }` |
| **Inline Object**         | `const o = { a: 1 };`    | `const o = { \n a: 1 \n };`    |
| **Same-Line Brace**       | `code; }`                | `code; \n }`                   |
| **Missing Brace**         | `if (c) stmt;`           | `if (c) { \n stmt; \n }`       |
| **In-Line Function**      | `function(...) { ... }`  | 선언과 바디 분리 필수          |

##### 위험 API 금지

| 금지 API            | 이유                       |
| ------------------- | -------------------------- |
| `eval`              | 동적 코드 실행             |
| `new Function`      | 동적 코드 생성             |
| `innerHTML`         | XSS 취약점                 |
| `document.write`    | DOM 오염                   |
| **주석 (Comments)** | **헤더 외 모든 주석 금지** |
| **좀비 코드**       | 주석 내 실행 가능 키워드   |

##### Dead Code 금지 (Dead Code Ban - Tier 2+)

브라우저가 감지하지 못하는 코드 품질 문제를 커널 감사에서 검출한다.

| 금지 패턴          | 이유                 | 에러 코드     | 적용 티어 |
| ------------------ | -------------------- | ------------- | --------- |
| **미사용 함수**    | 코드 부채, 혼란 유발 | DEAD_FUNCTION | Tier 2+   |
| **미사용 변수**    | 메모리 낭비          | DEAD_VARIABLE | Tier 2+   |
| **도달 불가 코드** | return 이후 코드     | UNREACHABLE   | Tier 3    |

##### 정적 분석 표준 검사 (Static Analysis Checks - Tier 2+)

| 금지 패턴             | 이유                      | 에러 코드       | 적용 티어 |
| --------------------- | ------------------------- | --------------- | --------- |
| **Magic Number**      | 의미 불명                 | MAGIC_NUMBER    | Tier 2+   |
| **Magic String**      | 반복/중복 문자열          | MAGIC_STRING    | Tier 2+   |
| **변수 섀도잉**       | 외부 스코프 변수 덮어쓰기 | SHADOWING       | Tier 2+   |
| **빈 블록**           | 무의미한 코드             | EMPTY_BLOCK     | Tier 3    |
| **조건 내 할당**      | `if(a=b)` 실수            | ASSIGN_IN_COND  | Tier 2+   |
| **중복 선언**         | 같은 스코프 내 재선언     | DUPLICATE_DECL  | Tier 2+   |
| **재귀 호출**         | 스택 오버플로우 위험      | RECURSION       | Tier 3    |
| **switch 무 default** | 불완전 분기 처리          | MISSING_DEFAULT | Tier 2+   |
| **불완전 비교**       | NaN, 타입 비교 누락       | INCOMPLETE_CMP  | Tier 2+   |
| **암시적 전역**       | 선언 없는 변수 사용       | IMPLICIT_GLOBAL | Tier 2+   |
| **무한 루프 가능성**  | 종료 조건 불명확          | UNBOUNDED_LOOP  | Tier 3    |
| **연속 할당**         | `a = b = c` 형태          | CHAINED_ASSIGN  | Tier 3    |
| **typeof 미검사**     | null 체크 누락            | TYPEOF_UNSAFE   | Tier 2+   |
| **배열 경계 미검사**  | 인덱스 검증 누락          | ARRAY_BOUNDS    | Tier 2+   |
| **Promise 미처리**    | await/catch 누락          | UNHANDLED_ASYNC | Tier 2+   |
| **부동소수점 ==**     | 정밀도 오류 위험          | FLOAT_COMPARE   | Tier 2+   |
| **분리된 else**       | 빈 if와 else 분리         | DANGLING_ELSE   | Tier 3    |
| **fallthrough**       | case 내 break 누락        | FALLTHROUGH     | Tier 2+   |
| **이중 부정**         | `!!value` 형태            | DOUBLE_NEGATION | Tier 3    |
| **복합 증분**         | `i += j += k` 형태        | COMPOUND_INC    | Tier 3    |
| **너무 깊은 중첩**    | 들여쓰기 3단계 초과       | DEEP_NESTING    | Tier 2+   |
| **과도한 인자**       | 함수 호출 시 인자 3개+    | TOO_MANY_ARGS   | Tier 2+   |

##### 2.4.1. NASA JPL Power of 10 : JS Translation Matrix

NASA의 안전 위주 규칙을 동적 언어인 JavaScript 런타임 환경에 맞게 재해석하여 적용한다. **단, UltronKit의 기준이 NASA 표준보다 엄격할 경우, UltronKit의 기준(Tier 3)을 우선 적용하여 강화(Hardened)한다.**

| 원본 규칙 (Original C)    | JS 재해석 (JS Context)                   | 적용 규칙 (Enforcement)                             | 에러 코드          | 티어 |
| :------------------------ | :--------------------------------------- | :-------------------------------------------------- | :----------------- | :--- |
| **No GOTO / setjmp**      | 제어 흐름의 비선형성 제거                | **Label 문 사용 금지 (`label:`)**                   | `GOTO_PATTERN`     | T2+  |
| **Fixed Loop Bounds**     | 무한 루프 방지 및 예측 가능성            | **while(true) 금지, iter 제한 필수**                | `UNBOUNDED_LOOP`   | T3   |
| **No Dynamic Allocation** | GC Thrashing 및 메모리 파편화 방지       | **부팅 후 `new` / 객체 리터럴 금지**                | `DYNAMIC_ALLOC`    | T3   |
| **No Recursion**          | 스택 오버플로우 방지 (JS 엔진 한계)      | **직/간접 재귀 호출 전면 차단**                     | `RECURSION`        | T2+  |
| **Simple Control Flow**   | 인지 복잡도 및 분석 난이도 제어          | **함수 10줄 (Hardened) / 복잡도 2 제한**            | `COMPLEXITY_LIMIT` | T3   |
| **Check Return Values**   | 비동기/동기 호출의 실패 케이스 누락 방지 | **모든 함수 호출 결과 변수 할당/검사**              | `IGNORED_RETURN`   | T2+  |
| **Data Hiding (Scope)**   | 전역 오염 및 상태 의존성 최소화          | **최소 스코프 선언, var 금지**                      | `SCOPE_VIOLATION`  | T2+  |
| **Pointer Usage**         | 참조 조작 및 깊은 접근의 위험성          | **2단계 이상 깊은 프로퍼티 체이닝 금지 (Hardened)** | `DEEP_CHAINING`    | T3   |
| **Pedantic Warnings**     | 런타임 에러 전 사전 차단                 | **경고를 Error로 격상 (Zero Tolerance)**            | `STRICT_WARNING`   | T2+  |
| **Assertion Density**     | 방어적 프로그래밍 강제                   | **함수당 최소 2개 `assert` 필수**                   | `LOW_ASSERT`       | T3   |

##### 2.4.2. MISRA C:2012 : JS Translation Matrix

임베디드/자동차 산업 표준을 웹 애플리케이션의 안정성 확보를 위해 재해석한다.

| 원본 규칙 (Original C)       | JS 재해석 (JS Context)                   | 적용 규칙 (Enforcement)                   | 에러 코드        | 티어 |
| :--------------------------- | :--------------------------------------- | :---------------------------------------- | :--------------- | :--- |
| **Dynamic Memory**           | 가비지 컬렉션 예측 불가능성 제어         | **런타임 객체 생성 최소화 (Pool 사용)**   | `GC_RISK`        | T3   |
| **Implicit Conversion**      | 느슨한 타입(`==`)으로 인한 사고 방지     | **암시적 형변환 금지 (`===` 강제)**       | `IMPLICIT_CONV`  | T2+  |
| **Unreachable Code**         | 실행되지 않는 데드 코드                  | **return/throw 이후 코드 금지**           | `UNREACHABLE`    | T2+  |
| **Unused Declaration**       | 코드 부채 및 혼란 가중                   | **미사용 변수/함수/파라미터 금지**        | `UNUSED_DECL`    | T2+  |
| **Bitwise Operators**        | JS 숫자는 부동소수점이므로 비트연산 위험 | **비트 연산자 사용 전면 금지**            | `BITWISE_OP`     | T3   |
| **Switch Case Fallthrough**  | 의도치 않은 분기 실행                    | **Switch 내 break/return 필수**           | `FALLTHROUGH`    | T2+  |
| **Pointer Arithmetic**       | 배열 인덱스 조작 실수                    | **직접적인 인덱스 연산 지양 (Iter 사용)** | `POINTER_MATH`   | T3   |
| **Multiple Volatile Access** | 비동기 상태의 비원자적 접근              | **동일 틱 내 상태 중복 수정 금지**        | `RACE_RISK`      | T3   |
| **Wait For Loop**            | 블로킹 I/O 유발                          | **동기식 대기(Sleep) 루프 금지**          | `BUSY_WAIT`      | T2+  |
| **Nested Comments**          | 파싱 모호성 및 주석 오용                 | **주석 중첩 및 헤더 외 주석 금지**        | `NESTED_COMMENT` | T3   |

##### 2.4.3. SEI CERT / CWE Top 25 : JS Security Matrix

보안 취약점(Security Vulnerabilities)을 JS 런타임 레벨에서 원천 차단하기 위한 매핑.

| 보안 취약점 (Vulnerability)    | JS 문맥 (JS Context)   | 적용 규칙 (Enforcement)                     | 에러 코드         | 티어 |
| :----------------------------- | :--------------------- | :------------------------------------------ | :---------------- | :--- |
| **Buffer Overflow**            | 배열 경계 초과 접근    | **배열 인덱스 접근 시 길이 불변식 검사**    | `BUFFER_OVERFLOW` | T2+  |
| **Injection (SQL/Code)**       | DOM XSS 및 eval 인젝션 | **innerHTML, eval, new Function 금지**      | `INJECTION_RISK`  | T2+  |
| **Prototype Pollution**        | 객체 프로토타입 변조   | **`__proto__`, `prototype` 접근 금지**      | `PROTO_POLLUTION` | T2+  |
| **Insecure Random**            | 예측 가능한 난수 사용  | **`Math.random` 금지 (Crypto API 권장)**    | `INSECURE_RANDOM` | T3   |
| **ReDoS (Regex DoS)**          | 정규식 백트래킹 부하   | **탐욕적(Greedy) 정규식 패턴 사용 주의**    | `REDOS_RISK`      | T2+  |
| **XSS (Cross-Site Scripting)** | 스크립트 실행 허용     | **인라인 이벤트 핸들러(`onclick`) 금지**    | `INLINE_SCRIPT`   | T2+  |
| **CSRF**                       | 요청 위조              | **모든 변경 요청에 토큰 검증 강제**         | `NO_CSRF_TOKEN`   | T2+  |
| **Race Condition**             | 비동기 상태 경쟁       | **await 사이의 원자성 위반 감지**           | `ASYNC_RACE`      | T3   |
| **Implicit Global**            | 전역 네임스페이스 오염 | **선언 없는 변수 할당 금지 (`use strict`)** | `IMPLICIT_GLOBAL` | T2+  |
| **Floating Point Math**        | 부동소수점 정밀도 누락 | **소수점 직접 비교(`a === 0.1`) 금지**      | `FLOAT_COMPARE`   | T2+  |

##### 2.4.4. JavaScript Common Linter Integration (ESLint/SonarQube)

일반적인 린터가 잡아내는 포괄적인 오류 및 안티 패턴을 커널 감사 규칙으로 격상시킨다.

| 분류 (Category)    | 규칙명 (Rule Name)            | 적용 규칙 (Enforcement)                      | 에러 코드         | 티어 |
| :----------------- | :---------------------------- | :------------------------------------------- | :---------------- | :--- |
| **Possible Error** | `no-compare-neg-zero`         | **-0과의 비교 금지**                         | `NEG_ZERO_COMP`   | T2+  |
| **Possible Error** | `no-dupe-keys`                | **객체 내 중복 키 정의 금지**                | `DUPLICATE_KEY`   | T2+  |
| **Possible Error** | `no-unsafe-optional-chaining` | **산술 연산 좌항에 옵셔널 체이닝 금지**      | `UNSAFE_OPTIONAL` | T2+  |
| **Best Practice**  | `no-new-wrappers`             | **`new Number`, `new String` 금지**          | `WRAPPER_OBJ`     | T2+  |
| **Best Practice**  | `no-sequences`                | **쉼표 연산자(`,`) 사용 금지**               | `COMMA_OP`        | T2+  |
| **Best Practice**  | `no-throw-literal`            | **문자열 throw 금지 (`new Error` 필수)**     | `THROW_LITERAL`   | T2+  |
| **Best Practice**  | `radix`                       | **parseInt 사용 시 기수(radix) 필수**        | `MISSING_RADIX`   | T2+  |
| **Variables**      | `no-shadow`                   | **상위 스코프 변수 섀도잉 금지**             | `VAR_SHADOW`      | T2+  |
| **Variables**      | `no-use-before-define`        | **선언 전 사용 금지**                        | `USE_BEFORE_DEF`  | T2+  |
| **ES6+**           | `no-useless-rename`           | **import/export 시 불필요한 이름 변경 금지** | `USELESS_RENAME`  | T2+  |
| **Style**          | `no-unneeded-ternary`         | **불필요한 삼항 연산자 금지**                | `USELESS_TERNARY` | T2+  |
| **Style**          | `no-lonely-if`                | **else 블록 내 유일한 if는 else if로 병합**  | `LONELY_IF`       | T2+  |

##### 2.4.5. 데이터 무결성 검사 (Data Integrity - Tier 2+)

| 금지 패턴                | 이유                       | 에러 코드       | 적용 티어 |
| ------------------------ | -------------------------- | --------------- | --------- |
| **스키마 미정의 데이터** | 모든 데이터 구조 명시 필수 | NO_SCHEMA       | Tier 2+   |
| **타입 불일치 허용**     | 런타임 타입 검증 필수      | TYPE_MISMATCH   | Tier 2+   |
| **범위 검증 누락**       | 숫자 범위 검사 필수        | NO_RANGE_CHECK  | Tier 2+   |
| **길이 검증 누락**       | 문자열/배열 길이 검사 필수 | NO_LENGTH_CHECK | Tier 2+   |
| **NULL/undefined 허용**  | 명시적 null 객체 패턴 사용 | NULLABLE_DATA   | Tier 3    |
| **불변성 위반**          | 상태 객체 직접 수정 금지   | MUTABILITY      | Tier 2+   |
| **원자성 미보장**        | 트랜잭션 단위 처리 필수    | NON_ATOMIC      | Tier 3    |
| **데이터 레이스**        | 공유 상태 동기화 필수      | DATA_RACE       | Tier 2+   |

##### 2.4.6. 코드 품질 메트릭 (Code Quality Metrics - Tier 2+)

**참고:** 아래 수치는 일반적인 표준보다 강화된 UltronKit 전용 기준이다.

| 메트릭                | Tier 1 | Tier 2 | Tier 3 | 에러 코드         |
| --------------------- | ------ | ------ | ------ | ----------------- |
| **순환 복잡도 (CCN)** | ≤10    | ≤5     | ≤2     | HIGH_COMPLEXITY   |
| **인지 복잡도**       | ≤15    | ≤10    | ≤5     | HIGH_COGNITIVE    |
| **함수 길이 (줄)**    | ≤30    | ≤20    | ≤10    | FUNC_TOO_LONG     |
| **파일 길이 (줄)**    | N/A    | N/A    | N/A    | EXEMPT_MONOLITH   |
| **중첩 깊이**         | ≤3     | ≤2     | ≤2     | DEEP_NESTING      |
| **매개변수 수**       | ≤3     | ≤3     | ≤3     | TOO_MANY_PARAMS   |
| **의존성 수**         | ≤7     | ≤5     | ≤3     | HIGH_COUPLING     |
| **코드 중복률**       | ≤5%    | ≤2%    | 0%     | CODE_DUPLICATION  |
| **주석 밀도**         | N/A    | 최소   | 0%     | EXCESSIVE_COMMENT |
| **테스트 커버리지**   | ≥80%   | ≥90%   | ≥100%  | LOW_COVERAGE      |

##### 2.4.7. 방어적 프로그래밍 (Defensive Programming - Tier 2+)

| 필수 패턴             | 이유                             | 에러 코드 (미적용 시) | 적용 티어 |
| --------------------- | -------------------------------- | --------------------- | --------- |
| **사전 조건 검사**    | 함수 진입 시 인자 검증 필수      | NO_PRECONDITION       | Tier 2+   |
| **사후 조건 검사**    | 함수 종료 전 결과 검증 필수      | NO_POSTCONDITION      | Tier 3    |
| **불변식 검증**       | 상태 변경 후 불변식 확인 필수    | NO_INVARIANT          | Tier 2+   |
| **경계 조건 테스트**  | 엣지 케이스 처리 필수            | NO_BOUNDARY_CHECK     | Tier 2+   |
| **실패 경로 테스트**  | 에러 경로 검증 필수              | UNTESTED_FAILURE      | Tier 2+   |
| **타임아웃 설정**     | 모든 비동기 작업에 타임아웃 필수 | NO_TIMEOUT            | Tier 2+   |
| **재시도 제한**       | 무한 재시도 금지                 | UNBOUNDED_RETRY       | Tier 2+   |
| **폴백 메커니즘**     | 실패 시 대체 동작 정의 필수      | NO_FALLBACK           | Tier 3    |
| **그레이스풀 셧다운** | 종료 시 리소스 정리 필수         | NO_CLEANUP            | Tier 2+   |
| **상태 머신 명시**    | 복잡한 상태는 FSM으로 모델링     | IMPLICIT_STATE        | Tier 3    |

### 2.2. 감사 실패 시 동작 (Failure Behavior)

- **구성:**
  - 헤더: "⚠️ KERNEL PANIC: {N} Errors (Audit: {ms}ms)" 및 위반 수 표시.
  - 리스트: 스크롤 가능한 영역(`max-height: 50vh`, 모노스페이스 폰트)에 모든 위반 사항을 나열.
  - **상세 보고:** 단순 위반명이 아닌, 인덱스된 파일 내의 **정확한 줄 번호(LN:)**, **글자 위치(CH:)**, **너비(WD:)**, **복잡도(CX:)**, **금지 토큰(TK:)**, 그리고 **원본 코드 스니펫(Snippet:)** 등 위반 원인을 오차 없이 보고해야 한다.
    - 예: `Grid.boot: WIDTH_EXCEEDED (LN:145, CH:71, WD:82/70, Snippet: "const longVariableName = ...")`
    - 예: `App.Logic.INC: BANNED_TOKEN (LN:12, CH:45, TK:"++", Snippet: "score++")`
  - 액션: "COPY"(클립보드 복사), "REBOOT"(새로고침) 버튼 제공.
- **개발자 전용:** 일반 사용자가 아닌 개발자에게 즉각적인 피드백을 주기 위함.
- **배포 차단:** 감사를 통과하지 못한 코드는 배포 불가.

### 2.3. 포맷팅 및 스타일 강제 (Visual Integrity)

- **Max Empty Lines:** 코드 내 연속된 빈 줄은 최대 1줄까지만 허용한다. (`\n\n\n` 이상 금지)
- **Conceptual Separation (개념적 분리) - 기계적 정의:**
  - **개념 단위(Conceptual Unit):** 아래 항목들을 각각 독립된 '개념'으로 간주한다.
    1. **Variable Group:** 연속된 `const`/`let` 선언 (중간에 빈 줄이 있으면 별개 개념으로 간주)
    2. **Control Block:** `if`, `for`, `while`, `switch` 등 제어문 전체 블록
    3. **Result Block:** 함수의 마지막 `return` 문
    4. **Top-level Declaration:** 각각의 `function` 또는 최상위 `const` 객체
  - **이격(Spacing) 규칙:** 서로 다른 '개념 단위' 사이에는 반드시 **정확히 1줄의 빈 줄**을 배치한다.
  - **밀착(Attaching) 규칙:** 같은 '개념 단위' 내부는 빈 줄 없이 밀착한다. 주석은 대상 코드와 밀착한다.
  - **Zero Padding:** 중괄호 `{` 바로 다음 줄과 `}` 바로 앞 줄에 빈 줄을 두는 것을 금지한다.
- **Indentation:** 2 spaces 강제. 탭 문자 금지.
- **Brace Style:** K&R 스타일 (같은 줄에 `{` 시작).
- **No Floating Promises:** 모든 Promise는 `await`되거나 `catch`되어야 한다. (권장)

#### 3. 조건부 화이트리스트 (Conditional Whitelist - Wrapper Only)

아래 항목은 명시된 커널 래퍼 내에서만 사용이 허용되며, 일반 코드에서는 금지된다.

| 키워드                    | 허용되는 위치 (Wrapper Name)                      |
| ------------------------- | ------------------------------------------------- |
| `try`, `catch`            | `Primitives.guard`                                |
| `for`, `while`, `forEach` | `Primitives.iter`                                 |
| `switch`, `case`          | `Primitives.match`                                |
| `async`, `await`          | `Logic.action`, `Grid.service`, `Effect.resource` |
| `new`                     | 아래 명시된 래퍼에서만 허용                       |

##### `new` 키워드 허용 래퍼

| 래퍼 위치               | 허용되는 생성자              |
| ----------------------- | ---------------------------- |
| `SystemModule.pool`     | `new Object()` (풀 초기화)   |
| `SystemModule.cache`    | `new Map()`, `new WeakRef()` |
| `SystemModule.registry` | `new FinalizationRegistry()` |
| `ReactorModule.channel` | `new BroadcastChannel()`     |
| `GridModule.pool`       | `new Worker()`               |
| `StateModule.proxy`     | `new Proxy()`                |

> **원칙:** `new`는 커널 인프라 래퍼에서만 허용. app.js에서는 절대 금지.

#### 4. 구조적 화이트리스트 (Structural Whitelist - Allowed everywhere)

아래 항목만이 유효한 JS 구문으로 허용된다.

##### 기본 구문

- `function`, `return`, `if`, `else`, `const`, `let`

##### 커널 API

- `ok`, `fail`, `panic`, `assert`
- `Guard`, `Iter`, `Match`, `Effect`
- `pick`, `type`, `typed`, `strip`
- `validateTypedArray`, `safePickReducer`

##### 데이터 구조

- `Object.assign`, `Object.keys`, `Object.entries`, `Object.freeze`
- `Array.isArray`, `Array.prototype.map`, `Array.prototype.filter`
- `Array.prototype.reduce`, `Array.prototype.some`, `Array.prototype.every`

##### DOM/WEB (초소수 허용)

- `document.createElement`, `document.getElementById`
- `document.querySelector`, `document.querySelectorAll`
- `window.location`, `window.addEventListener`
- `localStorage.getItem`, `localStorage.setItem`

##### 앱 전용 허용 (Application Only)

| 허용                           | 허용 이유                  |
| ------------------------------ | -------------------------- |
| `Math.random()`                | 랜덤 ID 생성 등 앱 로직    |
| `Date.now()`                   | 타임스탬프 기록 등 앱 로직 |
| `performance.now()`            | 성능 측정                  |
| `JSON.parse`, `JSON.stringify` | 데이터 직렬화              |

#### 2.1.5. UFC (Universal Function Contract) 및 명칭 규준

- **UFC:** 모든 함수는 반드시 `return ok(`, `return fail(` 또는 `return result` 형태의 명시적 반환문을 포함해야 한다. 감사 엔진은 이를 정규식으로 검증한다.

시스템의 가독성과 무결성을 보장하기 위해 아래와 같은 엄격한 네이밍 및 반환 규칙을 적용한다.

| 구분                | 스타일      | 적용 대상 (Scope / Context)                                           | 예시                                 |
| :------------------ | :---------- | :-------------------------------------------------------------------- | :----------------------------------- |
| **PascalCase**      | 대문자 시작 | **전역(Global):** 모듈 식별자, Sovereign API(래퍼), 블루프린트 키     | `Guard`, `SystemModule`, `Logic`     |
| **camelCase**       | 소문자 시작 | **지역(Local):** 스코프 내 변수(`const`/`let`), 매개변수, 내부 메서드 | `runtime`, `errorList`, `processKey` |
| **SCREAMING_SNAKE** | 전체 대문자 | **전역(Global):** 정적 상수, 에러 코드, 상태 액션 키                  | `AUTH_FAILURE`, `WORKER_MIN_LIMIT`   |

##### 명명 세부 규칙 (Scope-Aware Rules)

1.  **전역 const (Global Namespace):** 전역 스코프에서 선언된 `const`는 반드시 **PascalCase** (모듈/객체) 또는 **SCREAMING_SNAKE** (상수)여야 한다. `camelCase` 전역 변수는 원천 금지한다.
2.  **지역 식별자 (Function Scope):** 함수 내부에서 선언된 모든 변수(`const`, `let`) 및 매개변수는 불변 여부와 관계없이 반드시 **camelCase**를 준수해야 한다.
3.  **불리언 접두어 (Boolean Prefix):** 논리 상태를 저장하는 모든 식별자는 반드시 `is`, `has`, `can`, `should` 접두어를 가져야 한다. (예: `isBooted`, `hasPermission`)

##### 명명 세부 규칙 (Fine-grained Rules)

1.  **불리언 접두어 (Boolean Prefix):** 논리 분기에 사용되는 모든 변수는 반드시 `is`, `has`, `can`, `should` 등 상태를 나타내는 접두어를 포함해야 한다. (예: `isBooted`, `hasSchema`)
2.  **약어 처리 (Acronyms):** 모든 약어는 일반 단어로 취급하여 케이스를 적용한다. (예: `apiGateway` (O), `APIGateway` (X))
3.  **헝가리안 표기법 금지:** 명칭에 자료형 정보를 포함하는 것을 금지한다. (예: `userObj` (X), `listArr` (X) -> `user`, `items` (O))
4.  **무의미한 명칭 금지:** `data`, `item`, `val`, `temp` 등 문맥이 없는 명칭은 패닉 사유다. 반드시 `todoItem`, `auditResult` 등 실명을 사용한다.
5.  **Full-Name Only:** `runtime`, `object`, `key`, `value` 등 오타가 나더라도 실명을 사용한다. `rt`, `o`, `k` 등은 즉시 패닉 사유다. (예외: `idx`, `err` 등 널리 통용되는 3자 약어는 전역 블랙리스트에서 선별 허용 가능하나 권장하지 않음)

#### 2.1.6. 인지적 부하 및 구조적 제약 (Cognitive Constraints)

함수의 복잡성을 억제하고 인간의 인지 한계를 보호하기 위해 아래의 물리적 봉인을 강제한다.

- **매개변수 제한 (Parameter Limit):** 모든 함수 정의(정적 선언, 익명 함수, 인라인 콜백 포함)는 **최대 3개**의 매개변수만을 가질 수 있다. 그 이상은 객체 구조 분해(`destructuring`) 또는 의존성 주입을 통해 전달해야 하며, 이를 위반한 코드는 1비트의 예외 없이 `PARAM_LIMIT_VIOLATION`으로 처리한다.
- **분기 제한 (Branching Limit):** 단일 함수 내의 논리 분기(`if/else`)는 **최대 2개**로 제한한다. 초과 시 `Match` 래퍼로 분리하거나 함수를 쪼개야 한다.
- **루프 제한 (Loop Limit):** 함수 본문 내의 로우 레벨 루프(`for`, `while`) 사용은 지양하며, 사용 시 **최대 1개**만 허용한다. 중첩 루프는 감사 통과가 불가능하다. (`Iter` 래퍼 사용 필수)
- **중첩 함수 금지 (Nested Function Ban):** 함수 본문 내에서 또 다른 함수를 정의(`function ...`)하거나, 인라인 익명 함수를 콜백으로 전달하는 행위를 엄격히 금지한다. 모든 함수는 독립적인 이름을 가진 개체로 정의되어야 하며, 호출 시에는 해당 이름만을 참조해야 한다. (예: `map(fn)` (O), `map(function(x) { ... })` (X))
- **의존성 고립 (Layer Isolation):** 상위 Layer는 하위 Layer의 `Primitives` 및 `Control`을 참조할 수 있으나, 하위 Layer(`L0`)가 상위 Layer(`L2`, `Business`)를 호출하는 순환 의존성은 전면 금지한다.

#### 2.1.7. 3계층 감사 시스템 (Tiered Audit System)

시스템의 무결성과 개발 편의성 사이의 최적 균형을 위해 3계층 감사 정책을 시행한다. 모든 애플리케이션 레이어는 명시적 선언이 없을 경우 **Tier 1 (Base)**이 기본 적용된다.

| 규칙 항목       | **Tier 1** (Base)      | **Tier 2** (Pro)     | **Tier 3** (Ultra)         |
| :-------------- | :--------------------- | :------------------- | :------------------------- |
| **적용 대상**   | 신속 개발 & 프로덕션   | 고신뢰성 비즈니스 앱 | 미션 크리티컬 / 커널 규격  |
| **Line Limit**  | 30줄 (실용적 생산성)   | 20줄 (표준 고집)     | 10줄 (극도의 분해)         |
| **Width Limit** | 80자                   | 80자                 | 70자                       |
| **Complexity**  | 10 (복잡성 허용)       | 5 (균형)             | 2 (단순성 강제)            |
| **Comments**    | ✅ 전면 허용           | ⚠️ 헤더 및 핵심만    | ❌ 헤더 외 전면 금지       |
| **console.\***  | ✅ 전면 허용           | ⚠️ 개발 모드 전용    | ❌ 전면 금지               |
| **UFC**         | ❌ 선택 사항           | ✅ 강력 권장         | ✅ 필수 집행               |
| **Blacklist**   | 🔓 완화 (`this`, `=>`) | 🔐 전체 적용         | 🚫 전체 적용 + 커스텀 제한 |

#### 2.1.8. Mission-Critical Compliance (MCC - Level 4: Absolute Integrity)

커널 및 미션 크리티컬 레이어는 아래의 NASA JPL Power of 10 및 MISRA-C:2012를 상회하는 **Absolute Integrity** 규정을 준수해야 한다.

1.  **단일 진출점 (Single Exit Point):** 모든 함수는 반드시 본문의 가장 마지막 줄에서 **단 한 번**의 `return`을 수행해야 한다. 중간 반환(`Early Return`)은 제어 흐름의 파편화를 초래하므로 Tier 3 이상에서 엄격히 금지한다.
2.  **명시적 논리 검사 (Explicit Logic Only):** 어떠한 암시적 형변환(Truthy/Falsy)도 허용하지 않는다. `if (object)`는 패닉 사유다. 반드시 `if (object !== null)` 또는 `if (Primitives.type(object).data === "object")`와 같이 명시적 비교문을 작성해야 한다.
3.  **Assertion Density (2-Check Rule):** 모든 함수는 본문 내에 최소 **2개 이상**의 `assert` 또는 유효성 검사 로직을 포함해야 한다. (입력 검증 1개 + 중간 상태/결과 검증 1개 필수)
4.  **정적 메모리 의태 (Static Memory Mimicry):** `Kernel.boot()` 이후의 모든 객체는 `Object.preventExtensions` 및 `Object.freeze` 상태여야 한다. 런타임 중 객체에 새로운 키를 추가하거나 동적으로 구조를 변경하는 행위는 시스템 파괴로 간주한다.
5.  **부수 효과의 완전 분리:** 할당(`=`)은 반드시 단독 문장으로 작성되어야 한다. `if (a = b)` 또는 `return a = b`와 같은 구문은 발견 즉시 영구 봉인한다.
6.  **결정론적 타이밍 (Deterministic Timing):** 비동기 작업(`Effect.service`)은 반드시 `timeout`이 정의된 래퍼를 거쳐야 하며, 무한 대기 상태가 발생할 수 있는 모든 로직은 설계 결함으로 판정한다.
7.  **Zero Exceptions:** 커널 내부에서 `Error`를 생성하거나 `throw`하는 행위는 `panic` 함수에 의해서만 단 한 번(시스템 중단 시) 허용된다. 일반 로직에서의 `throw`는 즉시 사형감이다.
8.  **Strict UFC (Deep Contract):** `ok()`와 `fail()`에 담기는 `data` 객체의 스키마는 한 번 정의되면 절대 변할 수 없다. 리턴 타입의 다형성(Polymorphism)은 미션 크리티컬 환경에서 금지된다.
9.  **최소 스코프 원칙 (Minimal Scope):** 모든 변수는 가능한 가장 작은 스코프에서 선언되어야 한다. 함수 최상단에 모든 변수를 선언하는 것은 금지한다.
10. **정적 루프 상한 (Static Loop Bound):** 모든 루프는 정적으로 증명 가능한 상한이 있어야 한다. `iter` 래퍼를 통해 최대 반복 횟수를 명시해야 한다.
11. **반환값 필수 검사 (Return Value Check):** 모든 함수 호출의 반환값은 명시적으로 사용되거나 검사되어야 한다. 무시된 반환값은 `IGNORED_RETURN` 에러로 처리한다.

#### 2.1.9. Level 5: Formal Sovereignty (FS - Zero Tolerance Compliance)

커널의 핵심 중추(Tier 3+) 및 극도의 신뢰성이 요구되는 모듈은 **Formal Sovereignty** 등급을 적용하며, 이는 수학적 증명이 가능한 수준의 무결성을 강제한다.

1.  **순수 함수성 (Functional Purity):** 모든 함수는 외부 상태에 의존하거나 영향을 미치지 않는 순성 함수(Pure Function)여야 한다. 클로저를 통한 스코프 공유나 외부 변수 참조는 'Shared-Nothing' 원칙에 따라 패닉 사유가 된다.
2.  **스택 감옥 (Stack Jail):** 시스템 실행 중 함수 호출 깊이(Call Stack Depth)는 **최대 5레벨**을 초과할 수 없다. 깊은 중첩은 논리적 추적 불가능 상태로 간주하여 즉시 프로세스를 중단한다.
3.  **Dot-Only Notation:** 동적 인덱싱(`obj[key]`)은 물론이고, 변수를 통한 프로퍼티 접근 자체가 금지된다. 모든 속성 접근은 소스 코드상에 명시된 정적 도트 연산자(`.`)를 통해서만 허용된다.
4.  **Zero Nullity:** `null`과 `undefined`는 데이터 구조에 존재할 수 없다. 모든 변수는 선언과 동시에 명확한 값으로 초기화되어야 하며, 데이터의 부재는 전용 `fail()` 코드로만 표현해야 한다.
5.  **Hoare Logic Enforcement:** 모든 함수는 입구에서 `Pre-Condition`을 검증하고, 출구(return 직전)에서 `Post-Condition`을 검증하는 이중 보호막을 갖춰야 한다. 이 보호막이 없는 함수는 유효하지 않은 코드로 판정한다.
6.  **수학적 결정론:** 모든 연산의 결과는 입력이 동일할 경우 반드시 1비트의 오차 없이 동일해야 한다. 하드웨어 의존적 속성이나 비결정론적 API 사용은 커널 래퍼 내부로만 극도로 제한된다.

#### 2.1.10. Level 6: Sovereignty Finality (SF - Absolute Order Compliance)

가장 높은 신뢰 단계인 **Sovereignty Finality**는 시스템이 '수학적 조각상'처럼 완벽한 상태를 유지할 것을 요구한다. **UltronKit Kernel(Tier 3)은 반드시 이 레벨을 준수해야 한다.**

1.  **절대적 불변성 (Absolute Immutability):** 모든 변수는 초기화된 이후 **절대로** 재할당될 수 없다. 루프 내에서의 카운터 변경조차 허용되지 않으며, 모든 상태 변화는 새로운 상수의 생성을 통해서만 이루어져야 한다. (`let` 사용 전면 금지)
2.  **단위 안전성 (Unit-Safe Types):** 원시 타입(`number`, `string`)을 직접 사용하는 'Primitive Obsession'은 엄격히 금지된다. 모든 수치는 반드시 단위나 의미가 부여된 객체로 래핑되어야 한다. (예: `10` (X), `Distance.meter(10)` (O))
3.  **수학적 망라성 (Mathematical Exhaustiveness):** 모든 조건문과 `Match` 구문은 발생 가능한 모든 케이스를 수학적으로 망라해야 한다. `else`나 `_` (Default)에 의존하는 '나머지 처리'는 설계 결함으로 판정한다.
4.  **Perfect Correspondence:** 소스 코드의 모든 라인은 `SPEC.md`의 특정 절 또는 하위 규정과 1:1로 대응되어야 한다. 명세에 근거가 없는 모든 코드는 '오염된 정보'로 간주하여 삭제한다.
5.  **Zero Jitter Execution:** 런타임 중 가비지 컬렉션(GC)이나 예기치 않은 타이밍 지연이 발생할 가능성이 있는 모든 동적 할당과 익명 객체 생성을 금지한다. 메모리는 부팅 시점에 완전히 정적으로 할당되어야 한다.

#### 2.1.11. Level 7: Sovereign Singularity (SS - Absolute Void Compliance)

무결성의 종착역인 **Sovereignty Singularity**는 코드와 우주의 법칙 사이에 어떠한 간극도 허용하지 않는다. **UltronKit Kernel(Tier 3)은 이 레벨을 최종 지향점으로 하며, 모든 Primitives는 이를 강제한다.**

1.  **비분기 선형 로직 (Branchless Linear Logic):** 어떠한 형태의 조건 분기(`if`, `switch`, `Match`)도 금지한다. 모든 상태 전이는 미리 계산된 조회 테이블(Lookup Table)과 상태 전이 행렬을 통해서만 이루어지는 산술적 흐름이어야 한다.
2.  **제로-텍스트 아키텍처 (Zero-Text Architecture):** 모든 런타임 데이터는 숫자 혹은 바이너리 형태여야 한다. 문자열 처리나 텍스트 기반 파싱은 부팅 시점의 로딩을 제외하고는 0.1%도 허용하지 않는다.
3.  **부팅 후 Zero-Allocation:** 시스템 부팅 완료 직후, 런타임 중에는 단 1바이트의 메모리 할당이나 해제도 발생하지 않음을 수학적으로 보장해야 한다. (Heap Fragmentation = Death).
4.  **Code as Constant:** 모든 실행 코드는 메모리상에서 고정된 상수로 취급되며, 어떠한 동적 바인딩이나 고차 함수(Higher-order function)의 런타임 결정도 인가하지 않는다.
5.  **Perfect Jitter-Zero (1ms):** 모든 함수 호출의 실행 시간은 입력에 상관없이 1ms 단위의 오차 미만으로 항상 일정해야 한다. 실행 시간의 불규칙성은 보안 취약점으로 간주하여 즉시 시스템을 폐기(Halt)한다.
6.  **Absolute Zero Defect:** '예외 상황'이라는 단어 자체를 금지한다. 모든 상황은 사전에 설계된 상태 공간 내에 존재해야 하며, 설계되지 않은 모든 상황은 존재 자체가 불법이다.

#### 2.1.12. 브랜치리스 로직 (Branchless Logic & Wrappers)

`if`, `switch`를 직접적으로 사용하는 것은 금지된다. 대신 **Logic.branch** 래퍼 혹은 **정적 LUT**를 사용해야 한다. 특히 LUT는 함수 내부가 아닌 정적 스코프(부팅 시점)에 미리 정의되어야 하며, 런타임 중 단 1바이트의 객체 할당도 허용하지 않는다.

```javascript
// [규정 위반] 직접적인 if/else 사용
if (isOk) {
  return ok(data);
}

// [표준 준수 1] Logic.branch 래퍼 사용
return Logic.branch(
  isOk,
  () => ok(data),
  () => fail("ERR"),
);

// [표준 준수 2] 정적 LUT 패턴 (Zero-Allocation)
const OP_TABLE = [failFn, okFn];
function assert(cond, msg) {
  return OP_TABLE[Number(cond === true)](msg);
}
```

> [!CAUTION]
> **SS-COMPLIANCE NOTICE:** 본 등급의 규정 위반은 단순한 패닉이 아닌 **시스템의 존재 부정**이다. 감찰 엔진은 이 기준에서 벗어난 단 하나의 지시어도 용납하지 않으며, 감지 즉시 모든 입출력을 차단하고 블랙홀(Infinite Loop for Seizure) 상태로 진입한다.

> [!CAUTION]
> **SF-COMPLIANCE NOTICE:** 본 레벨은 '인간의 실수'를 물리적으로 불가능하게 만드는 것을 목표로 한다. 이 단계에서 발생하는 모든 `Verify` 위반은 단순한 오류가 아닌 **전체 시스템의 사형 선고**로 취급된다.

> [!CAUTION]
> **FS-COMPLIANCE NOTICE:** 본 레벨은 자비 없는 감사(Audit)가 적용된다. `Verify` 엔진은 이 기준을 만족하지 못하는 코드를 발견하는 즉시 **Kernel Halt**를 발동하여 시스템 전체를 영구 정지시킨다.

> [!NOTE]
> **Default Policy:** 모든 애플리케이션 레이어는 명시적 선언이 없을 경우 **Tier 1 (Base)**이 기본 적용된다.

> [!IMPORTANT]
> **하향 불가능칙:** 커널(`ultronkit.js`)은 설정과 무관하게 항상 **Tier 3 (Ultra)** 레벨로 고정되며, 어떠한 완화 정책도 적용받지 않는다.

### 2.2. 커널 래퍼 원칙 (Kernel Wrapper Principle)

위험한 키워드는 **커널 내부 래퍼에서 단 한 번만 선언**되며, 앱 개발자는 래퍼만 사용한다.

#### 핵심 원칙

| 원칙                   | 설명                                                |
| ---------------------- | --------------------------------------------------- |
| **Single Declaration** | 위험 키워드는 래퍼 내부에서 **단 한 번**만 선언     |
| **Zero Explanation**   | 앱 개발자는 래퍼 사용법만 알면 됨, 내부 이해 불필요 |
| **Maximum Limit**      | 래퍼가 내부적으로 한계치(루프 횟수 등) 강제         |

#### 래퍼 목록 (UltronKit 제공)

| 래퍼                    | 대체 대상   | 내부 키워드      |
| ----------------------- | ----------- | ---------------- |
| `Logic.branch(c, t, f)` | if/else     | `if`, `else`     |
| `Guard(fn, catchFn)`    | try/catch   | `try`, `catch`   |
| `Iter(arr, fn, limit)`  | for/while   | `for`            |
| `Match(val, cases)`     | switch/case | `switch`         |
| `Type.of(val)`          | typeof      | `typeof`         |
| `Effect.service()`      | async/await | `async`, `await` |

### 2.3. 검증 루프 알고리즘 명세 (Verification Loop Algorithm)

#### 감사 모드 (Audit Mode)

| 모드       | 동작                      | 용도        |
| ---------- | ------------------------- | ----------- |
| **STRICT** | 첫 위반 시 즉시 Panic     | 프로덕션    |
| **BATCH**  | 모든 위반 수집 → Panic UI | 개발/디버깅 |

#### 프로덕션 모드 (Production Mode)

`Ops({ production: true })` 설정 시 시스템은 프로덕션 모드로 동작하며, 보안 및 사용자 경험을 위해 디버그 관련 기능이 억제된다.

| 항목           | 프로덕션 (`true`)                                        | 개발 (`false` / 기본값)                        |
| -------------- | -------------------------------------------------------- | ---------------------------------------------- |
| **Panic UI**   | **숨김 (Silent)**. 배경색만 검정색으로 변하며 실행 중단. | **상세 표시**. 적색 패닉 UI 및 위반 로그 노출. |
| **Audit Log**  | 콘솔 및 UI에 로그를 출력하지 않음.                       | 모든 위반 사항(`LN`, `CH` 등)을 상세히 출력.   |
| **Debug Info** | 외부 노출 원천 차단.                                     | 코드 위치 및 금지 토큰 사유 정보 제공.         |

```javascript
Grid.config({ auditMode: "batch" }); // 또는 "strict" (기본)
```

#### Kernel_Audit_Loop 알고리즘

```
ALGORITHM Kernel_Audit_Loop:
  INPUT:  registry, app_slots, mode ("strict" | "batch")
  OUTPUT: ok("AUDIT_PASS") 또는 Panic UI

  CONST errors = []

  STEP 1. KERNEL_SELF_AUDIT:
    FOR EACH [path, value] IN registry (RECURSIVE):
      CONST isFn = typeof(value) === "function"
      CONST lut = {
        "true": () => verify(path, value),
        "false": () => ok(true)
      }
      CONST result = lut[String(isFn)]()
      // ... result handling via LUT ...
      ELSE IF typeof(value) === "string" AND length(value) > 70:
        violations.push("STRING_WIDTH_EXCEEDED: " + path)

  STEP 2. MIRROR_AUDIT (GHOST & SHADOW DETECTION):
    ## 상호 보증 원칙 (Mutual Assurance Principle)
    선언(Registry)과 구현(Implementation)은 단 1비트의 오차도 허용하지 않는다.
    - **GHOST**: 장부(Registry)에는 있으나 실제 코드가 삭제된 경우. (AI의 무단 삭제 방지)
    - **SHADOW**: 장부 등록 없이 몰래 구현된 코드. (비인가 기능 삽입 방지)
    FOR EACH function_name IN registry:
      IF function_name NOT IN memory_implementation:
        violations.push("GHOST_DETECTED: " + function_name)

    FOR EACH function_name IN memory_implementation:
      IF function_name NOT IN registry:
        violations.push("SHADOW_DETECTED: " + function_name)

  STEP 3. REPORT:
      SHOW_PANIC_UI(errors)
      RETURN fail("AUDIT_FAIL", errors.length)
    ELSE:
      RETURN ok("AUDIT_PASS")
```

#### 2.3.2. 패닉 리포팅 (Detailed Integrity Reporting)

시스템 무결성 위반(Panic) 발생 시, 커널은 단순 오류 메시지가 아닌 **레지스트리(schema)와 실체 간의 구체적인 불일치 내역**을 UI에 직접 전시해야 한다.

- **GHOST 리스트**: 등록되었으나 구현되지 않은 기능 목록 출력.
- **SHADOW 리스트**: 등록되지 않았으나 주입된 비인가 기능 목록 출력. **반드시 해당 기능이 정의된 소스 코드의 위치(LN: CH:)를 포함해야 한다.**
- **ERROR 리스트**: 10줄 제한, 계층 위반 등 규격 미달 내역 상세 출력.
- **목적**: 코드를 열어보지 않고도 런타임 상태에서 즉시 원인을 파악하고 정정하기 위함.

### 2.4. 소유권 각인 및 공개 인스펙터 (Ownership & Open Inspector)

시스템의 무결성은 투명하게 공개하되, 통제권은 물리적으로 각인된 소유자에게만 부여한다.

#### #kernel-status (Open Inspector)

주소창의 해시(`#kernel-status`)를 통해 누구나 시스템의 현재 정합성 상태를 확인할 수 있는 **공개 장부**를 제공한다.

- **작동**: `#kernel-status` 해시 감지 시 즉시 `K_MANIFEST` 및 `App Registry`를 전수 조사하여 리포팅.
- **전시 항목 (System Diagnostics Dashboard)**:
  1. **System Stats**: CPU Cores, Memory Usage, Uptime, User Agent 정보를 상시 전시.
  2. **Integrity Status**: `Mirror Audit` 결과(GHOST/SHADOW/ERROR)를 실시간 반영하여 총 에러 개수 및 상세 내역(LN, CH, Snippet) 보고.
  3. **Module Health**: 커널 내의 각 모듈(Primitives, System, Reactor 등)의 생존 및 무결성 상태를 [OK] 또는 [FAIL]로 표시.
  4. **Audit Metadata**: 감찰에 소요된 시간(Duration in ms)을 헤더에 명시하여 감찰 엔진의 성능 투명성 확보.

#### ?root=true (Ownership Bit)

브라우저의 URL 쿼리 파라미터(`?root=true`)를 통해 획득하는 일시적 또는 지속적 **소유권 각인** 시스템.

- **메커니즘**: `location.search`에서 `root=true` 감지 시 즉시 `UK_ROOT` 비트를 `localStorage`에 `true`로 각인.
- **성격**: 단순한 상태 플래그(Flag)일 뿐이며, 커널 수준의 복잡한 인증이나 접근 제어를 수행하지 않음. 앱 레이어에서 해당 값을 기반으로 추가 동작(예: 관리 도구 노출)을 수행하기 위한 식별자.
- **권한**: 인스펙터(`#kernel-status`) 내에서 파괴적 제어(WIPE) 버튼을 노출시키기 위한 트리거로 사용됨.

### 2.5. 애플리케이션 무결성 보증 (App Layer Mutual Assurance)

애플리케이션 레이어는 **파일명(`app.js`, `main.js` 등)에 관계없이** 런타임 레지스트리(`rt.slots`)를 통해 전수 조사된다. Sovereign API(`State`, `Logic`, `Design` 등)를 호출하여 등록되는 모든 기능은 즉시 커널의 감찰 대상이 된다.

#### 기본 동작 정책 (Default Behavior)

사용자가 별도의 설정을 하지 않아도 커널은 다음을 강제한다.

1.  **Implicit Ghost Detection (ON)**: `Design(routes)`, `State(watchers)`, `Logic(computed)` 등에서 참조하는 액션이나 데이터가 `Logic` 또는 `State`에 정의되어 있지 않으면 즉시 **GHOST_PANIC**을 발생시킨다. (AI의 오삭제 방지)
2.  **Shadow Detection (ON)**: Sovereign API를 통하지 않고 글로벌 스코프나 앱 런타임 슬롯에 임의로 주입된 속성이 발견되면 즉시 **SHADOW_PANIC**을 발생시킨다. (비인가 코드 방지)

#### 미션 크리티컬 표준: Policy.schema

AI의 실수를 0%로 만들기 위해, `Policy` 도메인에 앱의 전체 구조를 미리 선언하는 것을 권장한다. 스키마가 선언되는 순간, 커널은 선언되지 않은 모든 것과 선언되었으나 구현되지 않은 모든 것을 오차 없이 색출한다.

```javascript
Policy({
  schema: {
    State: ["todos", "filter"],
    Logic: ["ADD_TODO", "TOGGLE_TODO"],
    Design: ["home", "settings"],
  },
});
```

#### 자기 정화 (WIPE) 메커니즘

소유자(`root=true`)가 인스펙터에서 실행하는 시스템 정규화 절차.

1.  **WIPE SYSTEM**: 모든 비즈니스 데이터 및 비 휘발성 상태를 물리적으로 소멸.
2.  **WIPE ROOT**: 소유권 각인을 스스로 해제하고 일반 사용자 모드로 전환.
3.  **RE-AUDIT**: 비워진 상태에서 Mirror Audit을 재가동하여 '태초의 무결성' 검증.

#### Panic UI 명세

UltronKit 내장 Panic UI로 모든 위반 사항을 스크롤 가능한 목록으로 표시. 외부 CSS/HTML 파일 없이 JS 내에 내장된 문자열로 렌더링해야 한다.

```javascript
// 구현 참조용 템플릿 구조
const PANIC_CSS = `
  #uk-panic-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.95); z-index: 2147483647; display: flex; ... }
  .uk-panic-list { max-height: 300px; overflow-y: auto; font-family: monospace; ... }
`;
| **List**      | 위반 사항 목록 | 스크롤 가능, monospace 폰트                    |
| **Actions**   | 하단 버튼 그룹 | Export(JSON), Close(Dev Only)                  |

> **구현 원칙:**
>
> 1. `Shadow DOM` 등 격리 기술 고려 (가능한 경우).
> 2. `document.documentElement`에 직접 Append.
> 3. `Block all interactions` (클릭, 키보드 이벤트 캡처 및 차단).

#### 2.4.1. Panic UI 디자인 통일 규정

- **Visual Consistency:** `COPY` 버튼은 `REBOOT` 버튼과 동일하게 `uk-btn-primary` 스타일을 적용하여 시각적 중요도를 통일한다.
- **Layout Stability:** 모든 액션 버튼은 `min-width: 100px`를 확보하여 "COPIED!" 등의 텍스트 변경 시에도 레이아웃이 출렁이지 않도록 고정한다.
- **Registry Assurance:** `K_MANIFEST` 레지스트리에는 함수 타입(`fn`, `async fn`, `obj`)을 명시하며, 커널 감사는 실제 개체의 타입과 선언된 타입이 100% 일치하는지 검증한다. (Ghost & Shadow 탐지 포함)

```

┌─────────────────────────────────────────────┐
│ ⚠️ KERNEL PANIC: {N} Errors │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 1. [TOO_LONG] StateModule.update │ │
│ │ 2. [CASE_VIOLATION] Grid.GET_DATA │ │
│ │ 3. [UFC_VIOLATION] Morph.render │ │
│ │ 4. [TYPE_MISMATCH] Router.navigate: obj │ │
│ │ ... │ │
│ └─────────────────────────────────────────┘ │
│ [ COPY ] [ REBOOT ] │
└─────────────────────────────────────────────┘

```

| UI 요소            | 설명                                 |
| ------------------ | ------------------------------------ |
| **Header**         | 위반 개수 표시                       |
| **Violation List** | 스크롤 가능, 300px max-height        |
| **Export Log**     | violations를 JSON으로 다운로드       |
| **Close**          | (개발 모드만) UI 닫고 부팅 진행 시도 |

> **원칙:** Panic UI는 `ultronkit.js` 내에 CSS+HTML 템플릿으로 내장. 외부 파일 불필요.

#### verify(path, fn) 알고리즘

```

ALGORITHM verify(path, fn):
INPUT: path (함수경로), fn (함수 객체)
OUTPUT: ok(path) 또는 panic(reason)

LET src = fn.toString()
LET isKernel = path.includes("Module") OR path.includes("Primitives")

// 0. PREPROCESSING: 문자열 + 주석 제거 (정확한 토큰 감지용)
LET cleanSrc = strip_strings(src)
LET cleanSrc = strip_comments(cleanSrc) // /\* \*/ 및 // 제거

// --- 규칙 적용 (Tiered Policy Enforcement) ---
LET Tier = (isKernel) ? "Tier 3" : Policy.audit.tier
IF !Tier THEN Tier = "Tier 1" // Default Base Policy

LET MAX_LINES = (Tier == "Tier 3") ? 10 : (Tier == "Tier 2") ? 20 : 30
LET MAX_WIDTH = (Tier == "Tier 3") ? 70 : 80
LET MAX_COMPLEXITY = (Tier == "Tier 3") ? 2 : (Tier == "Tier 2") ? 5 : 10
LET UFC_REQUIRED = (Tier == "Tier 3") ? true : false
LET CONSOLE_BANNED = (Tier == "Tier 3") ? true : false
LET COMMENT_BANNED = (Tier == "Tier 1") ? false : true
LET BLACKLIST_STRICT = (Tier == "Tier 1") ? false : true

1. LINE_COUNT_CHECK:
   IF count_nonblank_lines(src) > MAX_LINES:
   panic("TOO_LONG: path")

2. WIDTH_CHECK:
   FOR EACH line IN src.split("\n"):
   IF length(line) > MAX_WIDTH:
   panic("WIDTH_EXCEEDED: path")

3. COMPLEXITY_CHECK:
   IF count_complexity_tokens(cleanSrc) > MAX_COMPLEXITY:
   panic("COMPLEXITY: path")

4. UFC_CHECK:
   IF UFC_REQUIRED AND !src.match(/return\s+(ok|fail)\(/):
   IF !path.includes("Primitives."):
   panic("UFC_VIOLATION: path")

5. COMMENT_CHECK:
   IF COMMENT_BANNED:
   IF src.match(/\/\//) OR src.match(/\/\*/):
   IF !is_header_comment(src):
   panic("COMMENT_BANNED: path")

6. CONSOLE_CHECK (커널 전용):
   IF CONSOLE_BANNED AND cleanSrc.match(/\bconsole\./):
   panic("CONSOLE_BANNED: path")

7. BLACKLIST_CHECK:
   LET Effective_Blacklist = ABSOLUTE_BLACKLIST + OPERATOR_BLACKLIST
   IF !BLACKLIST_STRICT:
   // Tier 1 Base Policy: Remove this and arrow function from blacklist
   Effective_Blacklist = filter(Effective_Blacklist, t => t != "this" AND t != "=>")

   FOR EACH token IN Effective_Blacklist:
   LET regex
   IF token.match(/^\w+$/):
        regex = new RegExp("\\b" + token + "\\b")
      ELSE:
        // Escape regex characters for symbols
        LET escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
   // Special handling for ternary ? to avoid matching ?. or ??
   IF token == "?":
   regex = /(?<!\?)\?(?!\.|\?)/
   ELSE:
   regex = new RegExp(escaped)

   IF regex.test(cleanSrc):
   panic("BANNED: path token")

8. WRAPPER_CHECK (컨텍스트 기반):
   FOR EACH [token, allowed_wrappers] IN CONDITIONAL_WHITELIST:
   LET regex = new RegExp("\\b" + token + "\\b")
   IF regex.test(cleanSrc):
   LET allowed = allowed_wrappers.some(w => path.includes(w))
   IF !allowed:
   panic("BANNED_CONTEXT: path token")

9. INDENT_CHECK:
   IF max_indent(src) > 4 spaces:
   panic("INDENT_EXCEEDED: path")

10. FORMATTER_STABILITY_CHECK (Zero-Diff Policy):
    // All blocks and objects MUST expand to multi-line.
    // 1. Opening brace '{' MUST be the last character of the line (excluding comments).
    // 2. Closing brace '}' MUST be on its own line.
    // Excludes: String interpolation '${'
    // Regex: Matches '{' that is NOT preceded by '$' and NOT followed by EOL (ignoring space/comments)
    IF src.match(/(?<!\$)\{(?!\s*(\/\/.*)?$)/):
    panic("FORMATTER_VIOLATION: '{' must be last token on line")

    // Regex: Matches '}' that is NOT preceded by whitespace+newline or is NOT followed by newline/comma/semicolon
    // (Simplified check: Just ensure } is not preceded by non-whitespace content on same line)
    // Actually, Prettier allows '} else {' or '},'.
    // We strictly ban 'code; }'. Code must end with newline before '}'.
    IF src.match(/\S\s\*\}/):
    // This matches 'return;}' or 'a:1}'
    panic("FORMATTER_VIOLATION: '}' must be on new line")

11. CONCEPTUAL_SPACING_CHECK (Strict Logic Flow):
    - **Rule A (Zero Padding):** `{` 직후 또는 `}` 직전에 빈 줄 존재 시 패닉.
      Regex: `/\{\n\s*\n/` 또는 `/\n\s*\n\s*\}/`
    - **Rule B (Concept Isolation):** `if/for/while/switch/return` 키워드 앞에 빈 줄 누락 시 패닉. (단, `{` 바로 다음인 경우는 제외)
      Regex: `/(?<!\{)\n(?!\s*\n)\s*(if|for|while|switch|return)\b/`
    - **Rule C (Comment Attachment):** 주석과 코드 사이에 빈 줄 존재 시 패닉.
      Regex: `/(\/\/.*|\*\/)\n\s*\n\s*\S/`

RETURN ok(path)

```

#### 헬퍼 함수 정의

```

FUNCTION strip*strings(src):
// 모든 문자열 리터럴 제거: "...", '...', `...`
RETURN src.replace(/"[^"]*"|'[^']\_'|`[^`]\*`/g, '""')

FUNCTION strip*comments(src):
// 블록 주석과 라인 주석 제거
RETURN src.replace(/\/\*[\s\S]*?\*\/|\/\/.\_/g, '')

FUNCTION is*header_comment(src):
// 첫 줄이 /* 로 시작하면 헤더 주석
RETURN src.trim().startsWith("/\_") AND first_block_ends_before_code()

FUNCTION count_complexity_tokens(src):
// if, &&, || 개수 합산
RETURN (src.match(/\bif\b|&&|\|\|/g) || []).length

```

#### 상수 정의 (Constants)

```

ABSOLUTE_BLACKLIST = [
"var", "class", "this", "with", "delete", "void",
"instanceof", "arguments", "in", "yield", "prototype",
"?"
]

OPERATOR_BLACKLIST = ["==", "!=", "++", "--", "=>"]

DANGEROUS_API = ["eval", "Function", "innerHTML", "document.write"]

CONDITIONAL_WHITELIST = {
"try": ["guard", "Guard"],
"catch": ["guard", "Guard"],
"for": ["iter", "Iter"],
"while": ["iter", "Iter"],
"forEach": ["iter", "Iter"],
"switch": ["match", "Match"],
"case": ["match", "Match"],
"async": ["Effect", "Logic.action", "Grid.service"],
"await": ["Effect", "Logic.action", "Grid.service"],
"new": [
"SystemModule.pool", "SystemModule.cache", "SystemModule.registry",
"ReactorModule.channel", "GridModule.pool", "StateModule.proxy"
]
}

```

### 2.4. NASA Power of 10 준수

- **재귀 제한:** 명시적인 종료 조건이 증명되지 않은 재귀 호출 감지 시 차단.
- **정적 메모리 할당 지향:** 초기화 이후 런타임 중 거대한 객체 생성이나 해제가 반복되는 패턴(GC Thrashing)을 감시 및 제한한다.

---

## 3. 멀티 스레드 실행 환경 (Multi-Threaded Execution Environment)

본 커널은 단일 스레드의 물리적 한계를 극복하고, UI의 즉각적인 반응성을 보장하기 위해 **3계층 구조의 실행 모델**을 강제한다.

### 3.1. 레이어 0: 렌더링 레이어 (The UI Fabric)

- **할당:** 메인 스레드 (Main Thread).
- **역할:** 오직 **"화면 그리기(Painting)"**와 **"사용자 입력 감지(Input Listening)"**만 수행한다.
- **제약 사항:**
  - 어떤 경우에도 데이터를 가공, 정렬, 필터링하는 로직을 수행할 수 없다. `for/while` 반복문 사용 시 Audit Failure 처리한다.
  - 데이터베이스(IndexedDB)에 직접 접근하는 것을 금지한다.
  - 이 레이어의 목적은 **"60FPS 방어"**이며, 연산 시간이 프레임 예산(16ms)을 초과하면 시스템 위반으로 간주한다.

### 3.2. 레이어 1: 네트워크 게이트웨이 (The Network Fabric)

- **할당:** 서비스 워커 (Service Worker) - 단일 인스턴스.
- **역할:** 외부 세계와의 유일한 **통신 창구**이자 **프록시(Proxy)**이다.
- **트래픽 통제:** 모든 HTTP 요청을 `FetchEvent` 리스너를 통해 가로채어, 네트워크 상태와 무관하게 `Cache API`를 통해 로컬 캐시를 우선 반환하거나 `BackgroundSync API`를 통해 요청을 큐(Queue)에 적재한다.
- **백그라운드 동기화:** UI나 컴퓨트 레이어가 종료된 상태에서도 `SyncEvent` 리스너를 활용하여 서버와의 데이터 동기화를 독립적으로 수행한다.
- **특징:** 이 레이어는 절대 멈추지 않아야 하므로, 무거운 연산을 수행해서는 안 되며 오직 **I/O 패스스루(Pass-through)** 역할에 집중한다.

### 3.3. 레이어 2: 컴퓨트 그리드 (The Compute Grid) - [Static Pre-allocated Pool]

#### 워커 풀 크기 결정 (Pool Size Calculation)

| 상수             | 값                                | 설명                         |
| ---------------- | --------------------------------- | ---------------------------- |
| `WORKER_MIN`     | **2**                             | 코어 수와 무관하게 최소 보장 |
| `WORKER_DEFAULT` | `max(2, hardwareConcurrency - 1)` | 메인 스레드 제외한 가용 코어 |
| `WORKER_MAX`     | `Grid.config({ workers: N })`     | 앱 선언 (선택적)             |

```

BOOT_COUNT = min(appConfig.maxWorkers || WORKER_DEFAULT, WORKER_DEFAULT)

예시:

- 8코어 + 앱 선언 없음 → min(7, 7) = 7개
- 8코어 + 앱 선언 4개 → min(4, 7) = 4개
- 2코어 + 앱 선언 없음 → max(2, 1) = 2개
- 1코어 + 앱 선언 없음 → max(2, 0) = 2개 (최소 보장)

````

#### 정적 풀 원칙 (Static Pool Principle)

| 원칙                     | 설명                                                        |
| ------------------------ | ----------------------------------------------------------- |
| **Pre-allocation**       | 커널 부팅 시 `BOOT_COUNT`개 워커를 한번에 생성, 메모리 점유 |
| **No Runtime Spawn**     | 런타임 중 워커 생성/소멸 없음 (GC Thrashing 방지)           |
| **Round-Robin Dispatch** | 고정 풀에서 순환 분배, Least-Busy 폴백                      |
| **Terminate on Unload**  | 페이지 unload 시에만 전체 terminate                         |

#### 워커 바이너리 및 스코프

- **단일 바이너리 컴파일 (Single Binary):** `app.js`의 `services` 객체를 `workerShell` 래퍼와 결합하여 단일 `Blob` URL 생성. 모든 워커는 동일 바이너리로 구동.
- **스코프 격리 (Scope Seal):** 워커는 `window`, 전역 상수 접근 불가. 모든 데이터는 Payload로만 전달.

#### 워커 분배 및 전송

- **로드 밸런싱:** `PendingTasks` 카운트 추적, Least-Busy 노드 우선 할당.
- **제로 카피 전송:** `ArrayBuffer` 전송 시 소유권 이전(Transfer)으로 0ms 전송.

#### 작업 할당 기준 (Dispatch Policy)

| 기준 | 조건 | 할당 방식 |
| ---- | ---- | --------- |
| **Least-Busy** | 기본값 | `workerMeta[i].pending` 최소인 워커 선택 |
| **Round-Robin** | 균등 분배 필요 시 | `rrIndex = (rrIndex + 1) % workers.length` |

#### 워커 통신 프로토콜 (Worker Message Protocol)

##### 요청 메시지 (Main → Worker)
```javascript
{ id: "serviceId", params: {}, rid: "requestId" }
```

##### 응답 메시지 (Worker → Main)
```javascript
// 성공
{ ok: true, data: result, rid: "requestId" }
// 실패
{ err: "ERROR_MESSAGE", rid: "requestId" }
```

##### 워커 셸 구조 (Worker Shell)
```javascript
self.onmessage = function(e) {
  var d = e.data;
  var fn = self.services[d.id];
  if (!fn) { postMessage({ err: "NO_SVC", id: d.id }); return; }
  try {
    var r = fn(d.params);
    postMessage({ ok: true, data: r, rid: d.rid });
  } catch (x) {
    postMessage({ err: x.message, rid: d.rid });
  }
};
self.services = {};
```

#### Promise Channel 프로토콜 (Request-Response Pattern)

Worker 호출은 반드시 Promise를 반환하며, `rid`(Request ID)로 응답을 매칭한다.

##### 알고리즘 (dispatch)

```
ALGORITHM dispatch(serviceId, params):
  1. IF workers.length === 0 THEN fail("NO_WORKERS")
  2. GENERATE: rid = unique_request_id()
  3. STORE: pendingRequests[rid] = { resolve, reject, timeout }
  4. SELECT: idx = getLeastBusy()
  5. SEND: workers[idx].postMessage({ id, params, rid })
  6. TIMEOUT: setTimeout(() => reject("E_TIMEOUT"), 5000)
  7. RETURN Promise
```

##### 응답 핸들러 (onmessage)

```
ALGORITHM handleWorkerMessage(event):
  1. EXTRACT: rid = event.data.rid
  2. LOOKUP: pending = pendingRequests[rid]
  3. IF !pending THEN RETURN (orphan response)
  4. CLEAR: clearTimeout(pending.timeout)
  5. DELETE: pendingRequests[rid]
  6. IF event.data.ok THEN pending.resolve(event.data.data)
  7. ELSE pending.reject(event.data.err)
```

##### 안전성 보장

| 항목 | 메커니즘 |
| ---- | -------- |
| **타임아웃** | 5000ms 후 자동 reject |
| **메모리 누수 방지** | 응답 수신 또는 타임아웃 시 pendingRequests에서 삭제 |
| **고아 응답** | rid 매칭 실패 시 무시 (로그 없음) |
| **에러 전파** | Worker 내 예외는 err 필드로 전달, reject로 전파 |

#### 장애 감독 (Supervision)

| 조건                       | 조치                          |
| -------------------------- | ----------------------------- |
| **연속 에러 3회**          | 해당 워커 Terminate + Respawn |
| **Heartbeat 200ms 무응답** | 해당 워커 Terminate + Respawn |
| **OOM 감지**               | Panic 발생, 앱 재시작 권고    |

### 3.4. 서비스워커 자동 생성 (Auto Service Worker - Ops.pwa)

커널은 PWA 필수 기능을 위한 서비스워커를 **내장 템플릿**으로 자동 생성하여 주입한다. 개발자는 별도 파일(`sw.js`)을 작성하지 않는다.

#### 선언적 활성화 (Declarative Activation)

```javascript
Ops({
  pwa: {
    sw: true, // 서비스워커 활성화 (기본값: true)
    cache: "cache-first", // 전략: "cache-first" | "network-first" | "stale-while-revalidate"
    push: false, // 푸시 알림 활성화 여부
    offline: true, // 오프라인 페이지 지원 여부
  },
});
````

#### 내장 서비스워커 기능

| 기능                | 전략                   | 설명                                               |
| ------------------- | ---------------------- | -------------------------------------------------- |
| **Asset Caching**   | Cache-First            | HTML, JS, CSS, 이미지 등 정적 자원 우선 캐싱       |
| **API Proxy**       | Network-First          | API 요청은 네트워크 우선, 실패 시 오프라인 큐 저장 |
| **Background Sync** | Recovery               | 네트워크 복구 시 오프라인 큐의 요청 자동 재전송    |
| **Update Check**    | Stale-While-Revalidate | 새 버전 감지 시 백그라운드 다운로드 후 알림        |

#### 자동 생성 프로세스

1. **Boot**: `Kernel.boot()` 시 `Ops.pwa` 설정 확인.
2. **Gen**: `Blob` 객체로 내장 SW 코드 생성 (User Config 주입).
3. **Reg**: `navigator.serviceWorker.register(blobUrl)` 실행.

---

## 4. 메모리 아키텍처 및 통신 (Memory & Communication)

스레드가 많아질수록 통신 비용(데이터 복사 시간)이 문제가 되므로, 이를 해결할 **전용 통신 규약**을 명세한다.

### 4.1. 제로 카피 통신 (Zero-Copy Protocol)

> **⚠️ SharedArrayBuffer 사용 금지 (Cross-Platform)**
> iOS Safari, 일부 Android 브라우저 미지원. CORP/COEP 헤더 필요.
> 모든 워커 간 통신은 `Transferable Objects`로만 한다.

#### Transferable Objects

대용량 데이터(`ArrayBuffer`, `MessagePort`, `ImageBitmap`) 전송 시 `postMessage(data, [data])` 문법을 사용하여 데이터의 **소유권(Ownership)**을 수신 측으로 완전히 넘긴다.

| 특성      | 값                    |
| --------- | --------------------- |
| 복사 비용 | **0ms** (소유권 이전) |
| 지원 범위 | ✅ 모든 브라우저      |
| 제약      | 전송 후 원본 무효화   |

### 4.2. 데이터 소유권 원칙 (Ownership Rules)

- **UI 스레드**는 데이터의 **'읽기 전용 뷰(Read-Only View)'**만 가진다. 절대 데이터를 직접 수정할 수 없다. `Object.freeze()`를 통해 UI 스레드로 전달되는 모든 상태 객체를 불변(Immutable)으로 만든다.
- **컴퓨트 그리드(프라이머리 노드)**만이 데이터의 **'쓰기 권한(Write Authority)'**을 가지며, 모든 상태 변경은 이곳에서 트랜잭션으로 처리된다.

### 4.3. Ironclad Memory Architecture

- **바이너리 레이아웃 전환 (Binary Layout):** 자바스크립트 객체(Object) 생성을 최소화하고, 모든 데이터는 `TypedArray` (`Float64Array`, `Int32Array`) 기반의 바이너리 구조로 관리한다. 이를 통해 GC 부하를 억제하고 메모리 점유율을 1/10 수준으로 압축한다.
- **윈도잉 및 메모리 페이징 (Windowing & Paging):** 전체 데이터를 메모리에 상주시키지 않고 `IndexedDB`에서 필요한 조각(Chunk)만 스트리밍한다. 메인 스레드는 뷰포트에 표시되는 데이터만 객체화하고 사용 직후 폐기한다.
- **데이터 유입 게이트키퍼 (Ingress Gatekeeper):** 외부 파일이나 API로부터 유입되는 대규모 데이터는 `ReadableStream` 단위로 분할 처리하여 메인 스레드 점유를 차단하고, 유입 단계에서 바이너리 스키마 검증을 병행한다.

### 4.4. 멀티탭 동기화 (Multi-Tab Synchronization)

같은 앱이 여러 브라우저 탭에서 열렸을 때 State 충돌을 방지한다.

#### BroadcastChannel 기반 동기화

```javascript
const channel = new BroadcastChannel("ultronkit-sync");
channel.onmessage = function fnSync(e) {
  if (e.data.type === "STATE_UPDATE") mergeState(e.data.payload);
};
```

#### Leader Election

| 역할            | 책임                             |
| --------------- | -------------------------------- |
| **Leader 탭**   | 서버 동기화, IndexedDB 쓰기 담당 |
| **Follower 탭** | Leader로부터 State 수신만        |

```
LEADER_ELECTION:
1. 탭 열릴 때 localStorage에 탭 ID 등록
2. 가장 오래된 탭 ID가 Leader
3. Leader 종료 시 다음 탭이 승계
```

#### State 전파

| 이벤트                   | 동작                                    |
| ------------------------ | --------------------------------------- |
| Leader에서 State 변경    | BroadcastChannel로 전파                 |
| Follower에서 Action 호출 | Leader에게 위임 → Leader가 처리 후 전파 |

---

## 5. 모던 프레임워크 코어 기능 (Modern Framework Capabilities)

커널은 최신 프론트엔드 프레임워크가 제공하는 핵심 UX/DX 기법을 내장하되, 이를 **실시간성(Real-time)**과 **예측 가능성(Predictability)**의 엄격한 제약 하에 구현한다.

### 5.1. 뷰 & 렌더링 엔진 (View & Rendering Engine)

- **파인 그레인드 리액티비티 (Fine-Grained Reactivity):** 상태 변경 시 VDOM 재조정이 아닌, 변경된 **텍스트 노드(TextNode)와 속성(Attribute)만 정밀 타격**하여 O(1) 복잡도를 보장한다. (정밀 구독 시스템 적용)
- **가상 렌더링 (Virtualization):** 데이터 규모와 관계없이 DOM 노드 개수를 화면 표시 한도(예: 20개) 내로 고정한다. 스크롤 시 노드를 생성하지 않고 기존 노드의 데이터 인덱스만 교체한다.
- **배치 업데이트 및 하드웨어 가속:** 모든 DOM 변경은 `requestAnimationFrame` 내에서 배치 처리하여 레이아웃 쓰래싱(Thrashing)을 방지한다. 고부하 뷰는 `Canvas` 기반 하드웨어 가속 렌더링으로 자동 전환하여 **60FPS**를 강제한다.
- **신호 기반 상태 (Signal-based State):** `get()` 호출 시 `activeEffect`를 통해 의존성을 자동 추적하고, `set()` 호출 시 `notifySubscribers(key)` 함수를 통해 구독자에게만 전파하여 사이드 이펙트를 최소화한다.
- **지연 평가 파생 상태 (Lazy Computed):** 종속된 데이터가 변할 때만 재계산하며, 읽기 전까지 계산을 미루어 불필요한 연산을 방지한다. `computedValue.dirty = true` 플래그를 사용하여 `get()` 호출 시 `dirty` 상태일 때만 `recompute()`를 실행한다.
- **배치 업데이트 (Batch Update):** 같은 프레임 내 발생하는 다수의 상태 변경을 `requestAnimationFrame` 콜백으로 묶어 단일 렌더링 사이클을 보장한다. `pendingUpdates` 큐에 변경 사항을 쌓고, 다음 `requestAnimationFrame`에서 일괄 처리한다.
- **리스트 디핑 (Keyed List Diffing):** `key` 속성을 기반으로 DOM 노드의 순서 변경, 추가, 삭제를 최소한의 조작으로 수행하여 레이아웃 쓰래싱을 방지한다. `diffList(oldChildren, newChildren, parentElement)` 알고리즘은 `Map`을 사용하여 `key` 기반으로 노드를 매칭하고, `insertBefore`, `appendChild`, `removeChild`를 최소화한다.
- **포털 (Portal/Teleport):** 모달이나 툴팁을 현재 컴포넌트 계층 구조에서 탈출시켜 `document.body` 등 특정 DOM 위치에 격리 렌더링한다. `createPortal(targetElement, content)` 함수는 `targetElement.appendChild(content)`를 직접 수행한다.
- **프래그먼트 (Fragment):** 불필요한 부모 요소(Wrapper) 없이 다중 노드를 반환하여 DOM 깊이를 최소화한다. `DocumentFragment`를 사용하여 여러 노드를 임시로 묶어 처리한다.

### 5.2. 동시성 렌더링 및 스케줄링 (Concurrent Rendering & Scheduling)

#### 타임 슬라이싱 (Time-Slicing without Generator)

> **⚠️ Generator/yield는 블랙리스트**
> 모든 Time-slicing은 `setTimeout(fn, 0)` 기반으로 구현한다.

| 방식                                 | 설명                                                        |
| ------------------------------------ | ----------------------------------------------------------- |
| `chunkedProcess(arr, fn, chunkSize)` | 배열을 `chunkSize` 단위로 분할, 각 청크 사이에 `setTimeout` |
| `deferToNextFrame(fn)`               | `requestAnimationFrame` 또는 `setTimeout(fn, 16)` 폴백      |
| `scheduleIdle(fn)`                   | `requestIdleCallback` 또는 `setTimeout(fn, 0)` 폴백         |

#### 우선순위 큐 (Priority Queue)

| 등급         | 시간 예산   | 예시                |
| ------------ | ----------- | ------------------- |
| `CRITICAL`   | 100ms 내    | 사용자 입력 반응    |
| `HIGH`       | 500ms 내    | UI 렌더링           |
| `BACKGROUND` | Best Effort | 데이터 동기화, 로깅 |

Min-Heap 기반 우선순위 큐로 작업 스케줄링.

#### 워커 브릿지 (Worker Bridge / Off-Main-Thread)

> **⚠️ SharedArrayBuffer 사용 금지**
> iOS Safari, 일부 Android 브라우저 미지원.
> 모든 워커 통신은 `postMessage` + `Transferable Objects`로 한다.

| 통신 방식                     | 지원   | 사용                                |
| ----------------------------- | ------ | ----------------------------------- |
| `postMessage(data)`           | ✅ All | 일반 데이터                         |
| `postMessage(data, [buffer])` | ✅ All | ArrayBuffer 소유권 이전 (Zero-copy) |
| `SharedArrayBuffer`           | ❌     | 사용 금지                           |

#### 브라우저 호환성 폴백 (Cross-Platform Polyfill)

| API                             | 폴백                 |
| ------------------------------- | -------------------- |
| `requestIdleCallback`           | `setTimeout(fn, 0)`  |
| `requestAnimationFrame`         | `setTimeout(fn, 16)` |
| `navigator.hardwareConcurrency` | 기본값 `4`           |

#### 우선순위 차선 (Priority Lanes)

작업을 `CRITICAL`(입력) → `HIGH`(UI) → `BACKGROUND`(데이터)로 분류하고, 고부하 연산이 UI 반응 속도를 침범하지 못하도록 물리적으로 차단한다.

### 5.3. 지능형 라우팅 시스템 (Intelligent Routing)

- **트리 기반 매칭 (Radix Tree Implementation):**
  - URL 경로를 `/`로 분할하여 `radixTree`를 탐색한다. 각 노드는 `children` 맵과 `handler` 함수를 가진다.
  - **Static Node:** 정확히 일치하는 문자열 (예: `user`). `radixTree.add('/user', handler)`는 `children['user']`에 노드를 생성한다.
  - **Param Node:** `:`로 시작하며 모든 값을 수용 (예: `:id`). `radixTree.add('/user/:id', handler)`는 `paramChild` 속성에 노드를 저장하고, 매칭 시 `:id` 값을 `params` 객체에 추출한다.
  - **Wildcard Node:** `**`로 시작하며 하위 모든 경로 수용. `radixTree.add('/files/**', handler)`는 `wildcardChild` 속성에 노드를 저장하고, 나머지 경로를 `splat` 배열에 추출한다.
  - 탐색 속도는 경로의 깊이(Depth)에만 비례하며(O(k)), 전체 라우트 개수와는 무관하다. `matchRoute(path)` 함수는 경로를 순회하며 최적의 매칭을 찾는다.
- **History API 독점 (Clean URL):** 해시(`#`)를 사용하지 않으며, `history.pushState()`, `history.replaceState()`, `window.addEventListener('popstate', ...)`를 통해 브라우저 주소를 직접 제어하여 완벽한 표준 URL 경험을 제공한다.
- **네비게이션 가드 (Middleware/Guard):** 페이지 진입 전(`beforeEnter(to, from)`), 이탈 전(`beforeLeave(to, from)`) 검증 로직을 `router.addGuard(guardFunction)`를 통해 등록하여 권한 없는 접근을 원천 봉쇄한다. 가드 함수가 `false`를 반환하거나 `Promise.reject()`하면 네비게이션을 취소한다.
- **스크롤 복원 (Scroll Restoration):** `history.pushState()` 호출 시 `window.scrollY`와 `window.scrollX` 값을 `state` 객체에 저장하고, `popstate` 이벤트 발생 시 저장된 값으로 `window.scrollTo()`를 호출하여 이전 페이지의 뷰포트 상태를 정확히 복구하여 사용자 경험의 연속성을 보장한다.
- **스마트 프리페칭 (Smart Prefetching):** 뷰포트에 링크가 노출되거나 호버(Hover) 시, `IntersectionObserver`와 `mouseover` 이벤트를 사용하여 해당 경로의 리소스를 `prefetchRoute(path)` 함수를 통해 사전에 로드하여 지연 시간을 최소화한다. 이는 `fetch()` API를 사용하여 필요한 데이터나 컴포넌트 번들을 미리 가져오는 방식으로 구현된다.
- **쿼리 스트링 동기화:** `URLSearchParams` API를 사용하여 상태와 URL 쿼리 파라미터(`?sort=asc`)를 실시간으로 동기화하여 딥링크의 정확성을 보장한다. `syncQueryParams(stateObject)` 함수는 상태 변경 시 URL을 업데이트하고, `parseQueryParams()`는 URL에서 상태를 복원한다.

### 5.4. 로컬 우선 데이터 엔진 (Local-First Data Engine)

- **라이브 쿼리 (Live Query):** 컴포넌트는 API를 호출하지 않고 로컬 DB(IndexedDB)를 구독한다. `subscribeToIndexedDB(storeName, query)` 함수는 `IDBTransaction`과 `IDBRequest`를 사용하여 데이터 변경을 감지하고, 변경 시 `notifySubscribers()`를 통해 뷰를 즉시 갱신한다. (Zero-Latency)
- **API 호출 금지 (Direct Fetch Ban):** UI 스레드 및 액션에서 `fetch()`, `XMLHttpRequest` 호출을 금지한다. `window.fetch = System.Panic.bind(null, "E_DIRECT_FETCH_BLOCKED")`와 같이 프록시하여 차단한다. 모든 데이터 요청은 **네트워크 워커(Service)**로 `dispatchNetworkRequest(request)`를 통해 위임해야 한다.
- **백그라운드 동기화 (Background Sync):** 로컬 변경 사항은 즉시 저장되고, 네트워크 연결 시 `self.registration.sync.register('data-sync')`를 통해 백그라운드 프로세스가 서버와 델타(Delta) 동기화를 수행한다. `syncDelta(localChanges)` 함수는 변경된 부분만 서버로 전송한다.
- **요청 중복 제거 (Deduplication):** 동일한 엔드포인트에 대한 중복 요청을 `pendingRequests` 맵에 저장하여 병합하고, 첫 번째 요청의 `Promise`를 공유하여 네트워크 대역폭을 절약한다.
- **무한 스크롤 (Infinite Query):** `IntersectionObserver`를 사용하여 뷰포트 하단에 도달 시 `fetchNextPage()`를 호출하여 대용량 데이터 리스트를 메모리 효율적으로 관리한다.
- **지수 백오프 재시도 (Exponential Backoff Retry):** 실패한 작업에 대해 `retryWithExponentialBackoff(fn, retries, delay)` 함수를 사용하여 `delay = initialDelay * (2^attempt)` 방식으로 대기 시간을 늘려가며 재시도하여 시스템 과부하를 방지한다.
- **전역 상태 트랜잭션 (Global State Transaction):** 모든 전역 상태 변경은 `beginTransaction()` 및 `commitTransaction()`/`rollbackTransaction()`을 통해 트랜잭션 단위로 처리되며, 실패 시 원자적으로 롤백되어야 한다. 이는 상태 변경 전 스냅샷을 저장하고, 실패 시 스냅샷으로 복원하는 방식으로 구현된다.

### 5.5. 마운팅 및 PWA 라이프사이클 (Mounting & PWA Lifecycle)

- **지연 마운팅 (Lazy Mounting):** 브라우저 메인 스레드 부하 분산을 위해, 중요도가 낮은 뷰는 `requestIdleCallback` 시점에 DOM에 부착(Mount)한다. `scheduleLazyMount(component, priority)` 함수는 `idleCallback` 래퍼를 통해 남은 시간을 확인하고 컴포넌트를 마운트한다.
- **이벤트 기반 로딩 (Event-Driven Loading):** `setTimeout` 기반의 불확실한 재시도 로직을 금지한다. 외부 모듈 로드는 반드시 `script.onload` 이벤트 또는 `MutationObserver` 훅을 통해 감지해야 한다. `loadModule(url)` 함수는 `Effect.async()` 래퍼를 통해 스크립트 로드 완료를 처리한다.
- **앱 셸 캐싱 (App Shell Caching):** `index.html`, `kernel.js`, `app.css` 등 핵심 자산은 **Cache-First** 전략으로 서비스 워커에 영구 캐싱하여 오프라인 즉시 로딩을 보장한다. `InstallEvent` 리스너에서 `cacheAppShell` 함수를 통해 핵심 자산을 캐시한다.
- **업데이트 제어 (Update Control):** 백그라운드에서 새 버전이 감지되면 `navigator.serviceWorker.addEventListener('updatefound', ...)`를 통해 사용자에게 알림을 띄우고, 승인 시 `worker.postMessage({ type: 'SKIP_WAITING' })`를 호출하여 `self.skipWaiting()`을 트리거하여 안전하게 교체한다.
- **설치 유도 브릿지 (A2HS Bridge):** 브라우저의 `beforeinstallprompt` 이벤트를 가로채어 `deferredPrompt`에 저장하고, 커널 UI(버튼 등)를 통해 `deferredPrompt.prompt()`를 호출하여 네이티브 앱 설치를 트리거한다.
- **화면 꺼짐 방지 (Wake Lock):** 임무 수행 모드(내비게이션, 대시보드 등) 진입 시 `navigator.wakeLock.request('screen')`를 자동 점유하여 화면이 꺼지지 않도록 한다. 모드 종료 시 `wakeLock.release()`를 호출한다.
- **하드웨어 햅틱 (Haptics):** 중요 인터랙션(오류, 성공, 경고) 발생 시 `navigator.vibrate([duration])`를 통해 물리적 피드백을 제공한다. `triggerHapticFeedback(type)` 함수는 미리 정의된 패턴에 따라 진동을 발생시킨다.

---

## 6. [EXPANDED] 유니버설 UI 모핑 엔진 (Universal UI Morphing Engine)

**Scope:** Runtime UI Adaptation Layer
**Target Systems:** Google Material 3, Microsoft Fluent, SAP UI5, IBM Carbon, Salesforce Lightning, Adobe Spectrum, Porsche DS, Bootstrap 5, Shoelace
**Architecture:** Tag-Agnostic Morphing (No Component Classes)

본 엔진은 개발자가 특정 UI 프레임워크에 종속되지 않도록 한다. 개발자는 오직 **표준 추상화(Standard Abstraction)**에 맞춰 HTML을 작성하며, 런타임 커널이 설정된 테마(Theme)에 따라 **DOM 구조와 속성을 실시간으로 변형(Morphing)**하여 9대 글로벌 디자인 시스템을 완벽하게 구현한다.

### 6.1. 슈퍼 스키마: 공통 추상화 계층 (The Super-Schema)

커널은 9개 시스템의 파편화된 용어를 사용하지 않고, 아래 정의된 **표준 데이터 속성(Data Attributes)**만을 해석한다.

- **`data-ui` (Identity):** UI 요소의 정체성. (`Button`, `Input`, `Icon`, `Card`, `Checkbox`, `Switch`, `Radio`, `Select`, `Badge`, `Spinner`)
- **`data-kind` (Hierarchy):** 시각적 중요도. (`primary`, `secondary`, `tertiary`, `danger`)
- **`data-density` (Size/Spacing):** 정보 밀도. (`compact`, `cozy`, `touch`)
- **표준 상태 (State):** `disabled`, `data-state="loading"`, `data-state="selected"`

### 6.2. 통합 매트릭스: 시스템 분류 및 공략 (The Integration Matrix)

커널은 9개 시스템을 **렌더링 메커니즘**에 따라 이원화하여 처리한다.

- **그룹 A: 태그 교체형 (Web Components / Custom Elements):**
  - **대상:** Material 3(`md-`), Fluent(`fluent-`), SAP UI5(`ui5-`), IBM Carbon(`bx-`), Porsche(`p-`), Adobe Spectrum(`sp-`), Shoelace(`sl-`).
  - **로직:** `data-ui` 감지 -> 현재 테마의 Prefix 확인 -> **DOM 태그 교체 및 속성 매핑** (예: `<button>` -> `<md-elevated-button>`).
- **그룹 B: 클래스 주입형 (CSS Frameworks):**
  - **대상:** Bootstrap 5, Salesforce Lightning (SLDS).
  - **로직:** 표준 HTML 태그 유지 -> **복잡한 클래스 조합 자동 연산 및 주입** (예: `class="btn btn-btn-primary"`).

### 6.3. 컴포넌트 변환 스펙 (Component Morphing Specs)

- **버튼 (Button):** `data-kind`에 따라 `<md-filled-button>`, `<fluent-button appearance="accent">`, `<ui5-button design="Emphasized">` 등으로 변환.
- **입력 필드 (Input):** Web Components는 `<md-outlined-text-field>` 등으로 교체, CSS Framework는 `<div class="form-floating">` 래퍼(Wrapper) 자동 생성.
- **아이콘 (Icon):** 아이콘 팩 의존성을 제거하고 Ligature(Material) 또는 SVG Sprite(Shoelace)로 표준화.
- **카드 (Card):** 전용 태그가 없는 경우 `Surface Style Injection`을 통해 섀도우, 라운딩, 배경색을 강제 주입.

### 6.4. 토큰 브릿지: CSS 변수 통합 (The Token Bridge)

개발자는 시스템별 변수명을 알 필요 없이 **Ironclad 표준 변수**(`--sys-color-primary` 등)만 사용한다. 커널은 부팅 시 각 시스템의 전용 변수(`--md-sys...`, `--bs-...`)에 표준 변수를 **실시간 매핑(Wiring)**하는 스타일을 헤더에 주입한다.

### 6.5. 구동 시나리오 (Runtime Scenario)

1.  **Loader:** 테마 설정 로드 (예: `theme: 'porsche'`).
2.  **Asset Injector:** 해당 디자인 시스템의 CDN 에셋(Script/CSS) 비동기 로드 및 토큰 브릿지 주입.
3.  **DOM Scan & Morph:** 가상 DOM 트리를 순회하며 `data-ui` 속성을 탐색하고, 활성 테마 규칙에 따라 **DOM Transmutation** 수행.
4.  **Render:** 최종적으로 변형된 원시(Native) 디자인 시스템 UI 출력.

---

## 7. 보안 및 데이터 검증 (Security & Validation)

### 7.1. 입력 검증 및 폼 핸들링 (Input Validation & Form)

- **엄격한 런타임 스키마 (Strict Runtime Schema):** 모든 IO 데이터 모델은 타입과 제약 조건이 명시되어야 하며, 런타임에 강제 검증된다.
- **데이터 방화벽:** 스토어에 데이터가 입력(Dispatch)되는 순간 스키마를 대조하며, 1비트라도 위반 시 트랜잭션을 거부하고 보안 경보를 발령한다.
- **상태 추적 및 오염 관리:** 폼 필드의 `dirty`, `touched`, `invalid` 상태를 정밀 추적하여 유효하지 않은 데이터의 전파를 막는다.

### 7.2. XSS 및 인젝션 방어 (CWE Top 25)

- **자동 이스케이프:** 뷰 엔진은 기본적으로 모든 문자열을 이스케이프 처리하여 XSS 공격을 무력화한다.
- **CSP 호환성:** `Content-Security-Policy`를 엄격히 준수하며, 인라인 스크립트 실행을 원천 차단한다.
- **비동기 점진적 감사 (Async Audit):** Time-to-Ready 단축을 위해 필수 모듈만 우선 검증하고, 나머지는 백그라운드 워커에서 검토한다. 검증 완료 전까지 해당 기능의 실행 권한을 잠그는 '기능별 게이트키핑'을 적용한다.

### 7.3. CSP/CORS 보안 헤더 (Security Headers)

서버에서 설정해야 하는 최소 필수 보안 헤더.

#### Content-Security-Policy (권장)

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://apis.google.com;
  font-src 'self';
```

| 정책                        | 설명                                   |
| --------------------------- | -------------------------------------- |
| `script-src 'self'`         | 인라인 스크립트 금지, 같은 origin만    |
| `style-src 'unsafe-inline'` | 동적 스타일 주입 허용 (Theme Morphing) |
| `connect-src`               | API 도메인 명시                        |

#### CORS (API 서버)

API Gateway에서 처리. UltronKit은 클라이언트 전용이므로 CORS 설정은 서버 책임.

---

## 8. 안정성 및 생존성 (Stability & Survivability)

### 8.1. 에러 경계 및 자가 치유 (Error Boundaries & Self-Healing)

- **격리된 렌더링 (Compartmentalization):** 특정 모듈의 장애가 전체 시스템의 셧다운으로 이어지지 않도록 `Guard` 래퍼를 사용하여 렌더링 경계를 격리한다. `renderBoundary(component, fallbackUI)` 함수는 컴포넌트 렌더링 중 발생하는 에러를 포착하여 대체 UI를 표시한다.
- **소프트 리셋 (Soft Reset):** 치명적 에러 발생 시 `restoreSnapshot(lastGoodState)` 함수를 호출하여 프로세스를 재시작하지 않고, 안전한 스냅샷 시점으로 메모리 상태를 복구한다. 이는 `IndexedDB`에 주기적으로 저장된 상태 스냅샷을 활용한다.
- **컴포넌트 격리 재시작:** 오류가 발생한 위젯만 DOM에서 제거(`removeComponent(id)`) 후 깨끗한 상태로 재생성(`createComponent(id, initialState)`)을 시도한다. 재시도 횟수를 제한하여 무한 루프를 방지한다.
- **메모리 압력 감지:** `performance.memory` API (비표준) 또는 `window.gc()` (개발자 도구)를 활용하여 OOM(Out of Memory) 징후 감지 시 `aggressivelyClearCache()` 함수를 호출하여 캐시를 공격적으로 소거하여 시스템 생존을 우선시한다.
- **객체 풀링 (Object Pooling Strategy):**
  - 런타임에 빈번히 생성되는 `ActionObject`, `StateUpdate`, `EventObject`는 `Kernel.Boot` 시점에 각각 1,000개씩 **미리 할당(Pre-allocation)**하여 `pool`에 저장한다. `initializePool(type, count)` 함수가 이를 담당한다.
  - 로직 수행 시 `new` 키워드 사용을 금지하고, `pool.rent(type)`로 객체를 빌려 쓴 뒤 `pool.return(object)`으로 반납한다. `pool.rent()`는 풀이 비어있을 경우 `System.Panic("E_POOL_EXHAUSTED")`를 발생시킨다.
  - 이를 통해 런타임 중 메모리 할당 그래프를 평탄화(Flat-line)하여 GC(Garbage Collection)에 의한 Frame Drop을 원천 봉쇄한다.
- **TypedArray 강제:** 상태(State) 데이터 중 숫자 배열이나 벡터는 반드시 `Float64Array`, `Int32Array` 등 **TypedArray**를 사용하여 V8 엔진이 C구조체처럼 최적화할 수 있도록 돕는다. `validateTypedArray(data)` 함수는 데이터 모델에 정의된 타입과 일치하는지 검증한다.
- **안전 모드 및 N-1 롤백 (Safe Mode):** 패닉 발생 시 복구 카운터를 체크한다. 무한 패닉 루프 감지 시 마지막 `Snapshop`을 무시하고 **최후 안전 상태(Safe-State)** 또는 초기 기판으로 기동한다.

### 8.2. 블랙박스 및 텔레메트리 (Blackbox & Telemetry)

- **원형 버퍼 레코더 (Ring Buffer Recorder):** 최근 N개의 시스템 이벤트를 `ringBuffer = new Array(N)`와 `ringBuffer.push(event)` (오버라이트)를 사용하여 블랙박스(메모리 버퍼)에 상시 기록한다.
- **크래시 덤프 (Crash Dump):** 처리되지 않은 예외 발생 시, `dumpBlackbox(error)` 함수가 블랙박스 내용을 `JSON.stringify()`로 직렬화하여 `localStorage` 또는 `IndexedDB`에 영구 저장한다.
- **데드라인 모니터:** `performance.mark()` 및 `performance.measure()`를 사용하여 실시간 마감 시간(Hard Real-time Deadline)을 초과하는 로직을 감지하고 `monitorDeadline(taskName, deadlineMs)` 함수를 통해 경고한다.

### 8.3. 런타임 접근성 감사 (A11y Auditor)

- **WCAG 2.1 준수 강제:** 렌더링 파이프라인에서 `auditAccessibility(domNode)` 함수를 통해 `aria-label`, `alt` 속성 누락, 색상 대비(Contrast Ratio) 부족 등을 실시간으로 검사하여, 신체적 제약이 있는 사용자도 임무를 수행할 수 있도록 보장한다. 위반 시 `System.Panic("E_A11Y_VIOLATION")` 또는 경고를 발생시킨다.

### 8.4. 메모리 누수 방지 (Memory Leak Prevention)

장시간 실행 시 메모리 누적을 방지하기 위한 메커니즘.

| 메커니즘                 | 용도                    |
| ------------------------ | ----------------------- |
| **WeakRef**              | DOM 캐시 참조 자동 해제 |
| **FinalizationRegistry** | 객체 소멸 추적 및 정리  |
| **Memory Pressure API**  | OOM 징후 시 사전 대응   |

#### WeakRef 활용

```javascript
const domCache = new Map();
function cacheNode(id, node) {
  domCache.set(id, new WeakRef(node));
  return ok(id);
}
function getNode(id) {
  const ref = domCache.get(id);
  if (!ref) return fail("E_NOT_FOUND", id);
  const node = ref.deref();
  if (!node) {
    domCache.delete(id);
    return fail("E_GC", id);
  }
  return ok(node);
}
```

#### FinalizationRegistry

```javascript
const registry = new FinalizationRegistry(function fnClean(id) {
  cleanupResources(id);
});
function register(obj, id) {
  registry.register(obj, id);
  return ok(id);
}
```

---

## 9. 데이터 영속성 및 마이그레이션 (Persistence & Migration)

### 9.1. 심화 영속성 아키텍처 (Advanced Persistence)

- **자동 마이그레이션 (Auto-Migration):** 데이터 구조 변경 시 `migrationScripts`에 정의된 파이프라인을 통해 하위 호환성을 보장하며 데이터를 마이그레이션한다.
- **오프라인 커맨드 큐 (Offline Command Queue):** 네트워크 단절 상황에서도 데이터 유실 없이 작업을 `IndexedDB`에 큐잉하고, 연결 복구 시 동기화한다.
- **원자적 쓰기 (Atomic Write):** 데이터 저장 중 전원 차단 등의 상황에서도 데이터 오염을 방지하기 위해 `Temp-Swap` 방식을 강제한다. `atomicWrite(key, data)` 함수는 `key_temp`에 먼저 쓰고 성공 시 `key`로 스왑한다.
- **오토 세이버 (Auto-Saver):** 상태 변경(Dispatch) 시마다 `saveStateSnapshot(state)` 함수가 변경된 상태 스냅샷을 `IndexedDB`에 즉시 저장한다. 이는 `requestIdleCallback`을 통해 비동기적으로 수행될 수 있다.
- **세션 부활 (Session Resurrection):** 부팅 시 초기 상태값 대신 `IndexedDB`의 마지막 스냅샷을 `loadStateSnapshot()` 함수를 통해 로드하여, 새로고침 후에도 작업 중이던 모든 상태를 완벽히 복원한다.
- **Resumable 오프라인 큐:** 모든 네트워크 요청은 멱등성(Idempotency)이 보장된 큐에 저장되며, 네트워크 복구 시 서비스 워커가 중단된 지점부터 자동으로 데이터를 이어 올리는 연속성을 보장한다.

### 9.2. 데이터 충돌 해결 (Conflict Resolution)

오프라인 후 동기화 시 데이터 충돌을 해결하는 전략.

#### 충돌 해결 전략

| 전략                      | 설명                             | 사용 시나리오   |
| ------------------------- | -------------------------------- | --------------- |
| **LWW (Last-Write-Wins)** | 타임스탬프 기준 최신 데이터 선택 | 기본값, 단순 앱 |
| **CRDT**                  | 충돌 없는 병합 가능 데이터 구조  | 협업 앱 (선택)  |
| **Manual Merge**          | 사용자에게 충돌 해결 위임        | 민감 데이터     |

#### LWW 알고리즘 (기본)

```
ALGORITHM Resolve_Conflict(local, remote):
  IF remote.timestamp > local.timestamp:
    RETURN remote
  ELSE:
    RETURN local
```

#### 선언적 충돌 전략

```javascript
Policy({
  conflict: "lww", // 또는 "crdt", "manual"
});
```

### 9.3. 대용량 데이터 한계 (Large Data Limits)

| 한계                | 권장                                    |
| ------------------- | --------------------------------------- |
| IndexedDB 단일 쿼리 | **10,000 레코드 이하**                  |
| DOM 리스트 렌더링   | **Virtual Scroll 필수** (1,000+ 아이템) |
| 전체 데이터셋       | **서버 Pagination** (100,000+)          |

> **원칙:** 클라이언트는 뷰포트 데이터만 처리, 나머지는 서버/IndexedDB에 위임.

---

## 10. 시스템 인터페이스 및 사용법 (Sovereign API)

커널은 **"Sovereign API"**라는 새로운 패러다임을 제시한다. 이는 기존의 거대한 설정 객체(Master Blueprint) 방식을 대체하는 **영역별 독립 함수(Domain Constructors)** 기반의 인터페이스다.

### 10.0. DX 설계 원칙 (Developer Experience Principles)

#### Zero Boilerplate 원칙

`app.js`에는 **순수한 비즈니스 로직과 선언만** 존재해야 한다.

| 금지                 | 이유                      |
| -------------------- | ------------------------- |
| 초기화 코드          | 커널이 자동 처리          |
| import/export 문     | 전역 UltronKit 객체 사용  |
| 이벤트 리스너 바인딩 | 선언적 `data-action` 사용 |
| DOM 조작 코드        | `Morph`가 자동 처리       |
| 상태 구독 코드       | 선언적 `data-bind` 사용   |

#### 상호 보증 원칙 (Mutual Assurance)

선언(Registry)과 구현(Implementation)은 단 1비트의 오차도 허용하지 않는다.

| 위반 항목  | 정의 및 패널티                                         | 방어 시나리오              |
| ---------- | ------------------------------------------------------ | -------------------------- |
| **GHOST**  | 선언되었으나 실체가 없음. **부팅 거부(Panic)**.        | AI의 함수 오삭제 방어      |
| **SHADOW** | 선언 없이 실체만 존재함. **부팅 거부(Panic)**.         | 비인가 기능 및 백도어 방어 |
| **FLAW**   | 실체는 있으나 규격(10줄 등) 위반. **부팅 거부(Panic)** | 코드 오염 및 독성 방어     |

---

#### Smart Defaults 원칙

모든 설정은 **선언하지 않아도 최적의 기본값**으로 동작한다.

| 도메인              | 선언 안함 시 기본값          |
| ------------------- | ---------------------------- |
| `Identity`          | 익명 앱, 게스트 허용         |
| `State`             | 빈 상태 `{}`                 |
| `Logic.actions`     | 없음 (필요하면 선언)         |
| `Logic.computed`    | 없음                         |
| `Logic.watchers`    | 없음                         |
| `Logic.middleware`  | 없음                         |
| `Design.routes`     | `"/"` → 첫 번째 `<template>` |
| `Design.theme`      | 시스템 테마 자동 감지        |
| `Ops.gateway`       | 없음 (API 안 쓰면 불필요)    |
| `Ops.features`      | 모든 기능 활성화             |
| `Policy.invariants` | 없음                         |
| `Grid.services`     | 워커 2개, 서비스 없음        |

#### Optional Declaration 원칙

안 쓰는 기능은 선언하지 않으면 **자동 비활성화**.

```javascript
// 최소 app.js - 정적 페이지
const { Design } = UltronKit;
Design({ routes: { "/": "tpl-home" } });
// 끝. 이것만으로 동작함.
```

```javascript
// 상태가 필요할 때만 추가
const { State, Logic, Design } = UltronKit;
State({ count: 0 });
Logic({
  actions: {
    INC: function fnInc(s) {
      return { count: s.count + 1 };
    },
  },
});
Design({ routes: { "/": "tpl-home" } });
```

#### 직접 접근 차단 원칙

`app.js`는 커널 내부에 **절대 직접 접근할 수 없다**.

| 금지                            | 대체                     |
| ------------------------------- | ------------------------ |
| `window.UltronKit.internal`     | 존재하지 않음            |
| `StateModule.update()`          | `Effect.put()`           |
| `RouterModule.navigate()`       | `Effect.navigate()`      |
| `Grid.workers[0].postMessage()` | `Effect.service('name')` |

### 10.1. Sovereign Constructors

애플리케이션은 7개의 독립된 도메인 생성자를 호출하여 정의된다. 순서는 무관하며, 각 생성자는 `UltronKit` 객체에서 구조 분해 할당하여 사용한다.

```javascript
/* PATTERN: Sovereign Implementation */
const { Identity, State, Logic, Design, Ops, Policy, Grid } = UltronKit;
```

#### 1. Identity (식별 및 인증)

앱의 메타데이터와 인증 정책을 정의한다.

```javascript
Identity({
  title: "Tykke",
  version: "1.0.0",
  auth: { guest: false }, // false: 로그인 필수, true: 게스트 허용
});
```

#### 2. State (상태 정의)

앱의 초기 상태 모델을 정의한다. 이는 불변 객체로 동결된다.

```javascript
State({
  todos: [],
  filter: "all",
  user: null,
});
```

#### 3. Logic (비즈니스 로직)

상태를 변경하는 액션(`actions`)과 파생 상태(`computed`), 사이드 이펙트 감시자(`watchers`)를 정의한다.

- **Actions:** 제너레이터 함수로 작성하며, `{ Effect }` 컨텍스트를 주입받는다.
- **Computed:** 상태(`s`)를 받아 값을 반환하는 순수 함수.
- **Watchers:** 특정 상태 키 변경 시 실행되는 제너레이터 함수.

```javascript
Logic({
  actions: {
    "add-todo": function* ({ Effect }, text) {
      yield Effect.put({ todos: [...state.todos, text] });
    },
  },
  computed: {
    activeCount: function (s) {
      return s.todos.filter(isNotDone).length;
    },
  },
  watchers: {
    theme: function* ({ Effect }, val) {
      document.body.className = `theme-${val}`;
      yield Effect.ux.vibrate(50);
    },
  },
  middleware: [
    function (action, state) {
      // 로깅 및 전처리기
      return ok(action);
    },
  ],
});
```

#### 4. Design (라우팅 및 디자인)

URL 라우팅(`routes`)과 다국어(`i18n`), 테마(`theme`)를 정의한다.

```javascript
Design({
  routes: [{ path: "/", template: "tpl-home", auth: "user", title: "Home" }],
  i18n: {
    ko: { hello: "안녕" },
    en: { hello: "Hello" },
  },
});
```

#### 5. Ops (운영 및 인프라)

API 게이트웨이(`gateway`)와 시스템 설정(`config`)을 정의한다.

```javascript
Ops({
  production: false, // true: 디버그 UI 및 감사 로그 숨김 (배포용)
  gateway: {
    todos: { url: "/api/v1/todos", method: "GET" },
  },
  features: {
    firebase_auth: true,
    offline_mode: false,
  },
});
```

#### 6. Policy (정책 및 검증)

데이터 무결성 불변식(`invariants`)과 폼 검증 스키마(`forms`)를 정의한다.

```javascript
Policy({
  invariants: {
    POSITIVE_COUNT: function (s) {
      return s.count >= 0;
    },
  },
  audit: {
    tier: "Tier 1", // "Tier 1" | "Tier 2" | "Tier 3" (Default: Tier 1)
    custom: {
      lineLimit: 35, // 특정 항목만 미세 조정 가능
    },
  },
});
```

#### 7. Grid (컴퓨팅 그리드)

백그라운드 워커에서 실행될 순수 함수(`services`)를 정의한다.

```javascript
Grid({
  services: {
    "heavy-calc": function (n) {
      return n * n;
    },
  },
});
```

### 10.2. Runtime Effects (`UltronKit.Effect`)

비즈니스 로직(Action, Watcher) 내에서는 오직 `Effect` 객체를 통해서만 사이드 이펙트를 발생시킬 수 있다.

- `Effect.put({ key: value })`: 상태 업데이트.
- `Effect.call('actionName', payload)`: 다른 액션(Generator) 동기/비동기 호출 (Composition).
- `Effect.resource('key', params)`: `Ops.gateway`에 정의된 API 호출.
- `Effect.service('name', payload)`: 백그라운드 워커(Grid)의 순수 함수 실행 요청.
- `Effect.auth.login() / logout() / link()`: 인증 처리.
- `Effect.ux.vibrate(ms)`: 햅틱 피드백.
- `Effect.alert(msg)`: 시스템 알림.
- `Effect.navigate(path)`: SPA 페이지 이동.
- `Effect.delay(ms)`: 비동기 지연.

#### 10.2.1. Effect 주입 및 상호 보증 원칙 (Injection & Assurance)

모든 `Action` 및 `Watcher` 함수는 첫 번째 인자로 `Effect` 객체를 전달받아야 하며, 외부 전역 변수나 커널 모듈에 직접 접근하지 않고 오직 이 객체를 통해서만 부수 효과(Side-Effect)를 실행한다. 커널은 런타임에 이를 검증하여 `Effect`가 누락되거나 위계가 어긋난 호출을 즉시 차단(Panic)한다.

### 10.3. 상호 보증 개발 원칙 (Mutual Assurance Development)

모든 커널 및 앱 코드는 다음의 **"생산적 불신"** 수칙을 준수해야 한다.

1. **코드 삭제 금지**: 선언된 기능은 절대 삭제될 수 없다. (Violation: GHOST_DETECTED)
2. **몰래 구현 금지**: 선언 없이 기능을 추가할 수 없다. (Violation: SHADOW_DETECTED)
3. **규격 외 구현 금지**: 함수는 반드시 정책에 따른 라인 제한(Tier 1: 30줄 등)을 지켜야 한다. (Violation: FLAW_DETECTED)
4. **위계 질서 준수**: 하위 계층은 상위 계층을 절대 알지 못한다. (Violation: LAYER_VIOLATION)

---

## 11. 결론 (Conclusion)

본 명세서는 "도구 없는 환경"이라는 제약을 "런타임의 강력한 통제"로 승화시킨 시스템이다. 이 커널 위에서 구동되는 애플리케이션은 **개발자가 실수할 권리를 박탈**당함으로써, 역설적으로 **최고 수준의 품질과 안정성을 보장**받는다.

---

## 12. [AS-BUILT] Implementation Details (Truth in Code)

본 섹션은 **Kernel Source (v0.0.0)**에 실제로 구현되어 있는 아키텍처 및 메커니즘을 상세 기술한다.

### 12.1. Physical Architecture (3-Tier + Domain Model)

본 커널은 단일 파일 내에서 **3-Layer 계층**과 **도메인 모듈**을 결합한 구조를 사용한다.

#### Layer 구조 (Strict Layer)

```

┌─────────────────────────────────────────────────────────┐
│ LAYER 2: KERNEL │
│ (Orchestrator, Effect, Boot) │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ │
│ │ State │ │ Morph │ │ Router │ │ Grid │ │
│ │ (상태) │ │ (UI) │ │(라우팅) │ │ (워커) │ │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ │
├─────────────────────────────────────────────────────────┤
│ LAYER 1: INFRASTRUCTURE │
│ Data(영속), Reactor(신호), System(Pool/Timer) │
├─────────────────────────────────────────────────────────┤
│ LAYER 0: FOUNDATION │
│ ok, fail, panic, assert, pick, CONST, Guard │
└─────────────────────────────────────────────────────────┘

```

#### 의존성 및 재사용 규칙 (Dependency & Reuse Rules)

모든 커널 코드는 물리적으로 분리된 **하위 레이어의 Primitives**를 최대한 재사용해야 하며, 직접적인 브라우저 API 호출이나 로직 중복을 배제한다.

| 위계                         | 허용 의존성         | 금지 사항 (Violation -> Panic)      |
| ---------------------------- | ------------------- | ----------------------------------- |
| **Layer 0 (Foundation)**     | 없음                | L1/L2 호출, 브라우저 API 직접 노출  |
| **Layer 1 (Infrastructure)** | Layer 0             | Layer 2 호출, L1 상호 호출, L0 스킵 |
| **Layer 2 (Orchestrator)**   | Layer 0 + Layer 1   | 전역 직접 접근, 레이어 단축 호출    |
| **App Layer (app.js)**       | Sovereign API (L2)  | 커널 내부 직접 접근, L1 직접 호출   |
| **Layer 2 Kernel**           | 모든 Layer + Domain | -                                   |

#### Domain 간 통신 규칙

- **Domain → Domain 직접 호출 금지**
- 모든 Domain 간 통신은 **Kernel을 통해서만** (Mediator Pattern)
- 예: State 변경 → Kernel이 Morph에 통보

#### 물리적 코드 배치 순서

```javascript
// 1. LAYER 0: Foundation
const CONST = { ... };
function ok(d) { ... }
function fail(c, m) { ... }
function panic(m) { ... }

// 2. LAYER 1: Infrastructure
const SystemModule = { ... };
const ReactorModule = { ... };
const DataModule = { ... };

// 3. LAYER 2: Domains
const StateModule = { ... };
const MorphModule = { ... };
const RouterModule = { ... };
const GridModule = { ... };

// 4. LAYER 2: Kernel (Orchestrator)
const Kernel = { ... };
```

### 12.2. Registry Structure (K_MANIFEST)

```javascript
const K_MANIFEST = {
  Primitives: {
    Result: { ok: 1, fail: 1 },
    Control: { panic: 1, assert: 1, guard: 1, iter: 1, match: 1 },
    Data: { type: 1, pick: 1, strip: 1 },
    Panic: {
      createUIEl: 1,
      createPanicEl: 1,
      getErrColor: 1,
      renderPanicItem: 1,
      renderPanicList: 1,
      panicLog: 1,
      trigExp: 1,
      trigCopy: 1,
      addExpBtn: 1,
      addCopyBtn: 1,
      addRebootBtn: 1,
      makeListBox: 1,
      makeHeader: 1,
      makeActs: 1,
      assembleUI: 1,
      makeBtn: 1,
    },
    Inspect: {
      createInspectEl: 1,
      makeInBox: 1,
      addInItem: 1,
      addWipeBtns: 1,
      inspect: 1,
      checkRoot: 1,
    },
    Verify: {
      audit: 1,
      auditObj: 1,
      auditFn: 1,
      auditVal: 1,
      checkGhost: 1,
      checkShadow: 1,
      runChecks: 1,
      checkLen: 1,
      checkWid: 1,
      checkCyc: 1,
      checkFmt: 1,
      checkOpenBrace: 1,
      checkCloseBrace: 1,
      checkEmpty: 1,
      checkIndent: 1,
      checkOneLiner: 1,
      checkComments: 1,
      checkCase: 1,
      checkUFC: 1,
      checkBlack: 1,
      checkOps: 1,
      getPos: 1,
      processAuditKeys: 1,
      reportLenViolation: 1,
      reportWidViolation: 1,
      reportCyc: 1,
      reportCycViolation: 1,
      reportBraceViolation: 1,
      reportEmptyViolation: 1,
      reportTokenViolation: 1,
      reportTokenAt: 1,
      reportOpViolation: 1,
      reportOpAt: 1,
      getBannedOps: 1,
      reportShadow: 1,
      reportMissingObj: 1,
    },
  },
  System: {
    System: {
      Pool: { init: 1, rent: 1, returnObj: 1, stats: 1 },
      Timer: { tick: 1, stop: 1, stopAll: 1 },
      Cache: { set: 1, get: 1, delete: 1, clear: 1 },
      Memory: { pressure: 1, gc: 1 },
    },
    Reactor: {
      Signal: { track: 1, trigger: 1, effect: 1, computed: 1, batch: 1 },
      Fiber: { push: 1, flush: 1, cancel: 1 },
      Queue: { push: 1, process: 1, clear: 1 },
      Channel: { create: 1, broadcast: 1, subscribe: 1, close: 1 },
      Leader: { elect: 1, isLeader: 1, resign: 1 },
    },
    Data: {
      Vault: { read: 1, write: 1, delete: 1, clear: 1, atomic: 1 },
      Sync: { run: 1, delta: 1, conflict: 1 },
      Migration: { check: 1, run: 1, rollback: 1 },
      Offline: { queue: 1, flush: 1, retry: 1 },
      Blackbox: { record: 1, dump: 1, clear: 1 },
    },
    State: {
      Core: {
        get: 1,
        update: 1,
        validate: 1,
        freeze: 1,
        snapshot: 1,
        restore: 1,
      },
      Schema: { define: 1, validate: 1 },
      Transaction: { begin: 1, commit: 1, rollback: 1 },
      Invariant: { register: 1, check: 1 },
    },
    Morph: {
      DOM: { render: 1, patch: 1, diff: 1, portal: 1, fragment: 1 },
      Bind: {
        text: 1,
        attr: 1,
        style: 1,
        value: 1,
        href: 1,
        show: 1,
        hide: 1,
        for: 1,
        include: 1,
        action: 1,
        link: 1,
      },
      I18n: { set: 1, get: 1, bind: 1 },
      Theme: { inject: 1, morph: 1, token: 1 },
      Virtual: { init: 1, scroll: 1, recycle: 1 },
      A11y: { audit: 1, fix: 1 },
    },
  },
  Business: {
    Router: {
      Nav: { go: 1, replace: 1, back: 1, forward: 1 },
      Route: { match: 1, add: 1, remove: 1 },
      Guard: { before: 1, after: 1, check: 1 },
      Scroll: { save: 1, restore: 1 },
      Prefetch: { link: 1, hover: 1 },
      Query: { parse: 1, sync: 1 },
    },
    Grid: {
      Boot: { init: 1, spawn: 1, terminate: 1 },
      Service: { dispatch: 1, register: 1 },
      Worker: { send: 1, receive: 1, heartbeat: 1, respawn: 1 },
      Balance: { leastBusy: 1, roundRobin: 1 },
      ServiceWorker: { register: 1, update: 1, skip: 1, cache: 1 },
      service: 1,
    },
  },
  Kernel: {
    Kernel: { boot: 1, Boot: 1, Dispatch: 1, Watcher: 1, Computed: 1 },
    Effect: {
      put: 1,
      call: 1,
      resource: 1,
      service: 1,
      alert: 1,
      navigate: 1,
      delay: 1,
      all: 1,
      race: 1,
      auth: 1,
      ux: 1,
      pwa: 1,
    },
  },
};
```

> [!IMPORTANT]
> 본 레지스트리는 `ultronkit.js`의 `K_MANIFEST`와 1:1 동기화되어야 한다. 불일치 시 GHOST/SHADOW 감지 대상이다.

### 12.3. Primitives Integration (Audit & Panic) [Strict]

- `cyc`: 순환 복잡도(Complexity) Tier 기준(10/5/2) 초과 시 `panic`. `?` 사용 시(Tier 2/3) 즉시 차단.
- `len`: 함수 길이 Tier 기준(30/20/10줄) 초과 시 `panic`.
- `fmt`: One-Liner `{}` 또는 인라인 제어문 발견 시 `panic`.
- `timerRegistry`: 관리형 타이머. `System.Timer.tick/stop`을 통해 중앙 제어.

### 12.2. Directive System (Fine-Grained Binding)

DOM 갱신은 Virtual DOM Diffing 대신, 데이터 속성(Data Attribute)에 기반한 직접 바인딩을 사용한다.

- **`data-bind="path"`**: `textContent`를 State의 경로(`path`) 값으로 바인딩. `bindText(node, path)`는 `State.subscribe(path, onTextChange)` 패턴으로 구독한다.
- **`data-show="path"` / `data-hide="path"`**: Boolean 값에 따라 `display: none` 토글. `bindVisibility(node, path, isShow)`는 `State.subscribe(path, onVisibilityChange)` 패턴으로 구독한다.
- **`data-bind-attr="attr:path"`**: 속성값 바인딩 (예: `src:user.photoURL`).
- **`data-bind-style="style:path"` / `data-bind-value="path"` / `data-bind-href="path"`**: 개별 스타일, 값, 하이퍼링크 바인딩.
- **`data-action="TYPE"`**: 클릭 시 해당 Action을 Dispatch. 첫 번째 인자로 `data-payload` 값을 전달할 수 있다.
- **`data-payload="value"`**: `data-action` 호출 시 전달할 인수.
- **`data-link="path"`**: 클릭 시 SPA 네비게이션 처리 (`history.push`).
- **`data-include="id"`**: `<template id="...">` 내용을 해당 노드 위치에 렌더링.
- **`data-for="item in path"`**: 리스트 렌더링. `path` 배열의 각 요소를 `item` 변수로 템플릿 복제.
- **`data-i18n="key"`**: 다국어 텍스트 바인딩.
- **`data-i18n-attr="attr:key"`**: 속성 다국어 바인딩.
- **`data-i18n-vars="var1:path1,var2:path2"`**: 다국어 텍스트 내 변수 치환 바인딩.

### 12.3. 워커 아키텍처 (Static Pre-allocated Worker Pool)

비동기 및 무거운 작업은 메인 스레드에서 분리된 워커 생태계로 격리된다.

#### 워커 풀 크기 (3.3절 참조)

- `WORKER_MIN = 2` (코어 수와 무관한 최소 보장)
- `WORKER_DEFAULT = max(2, hardwareConcurrency - 1)`
- 앱에서 `Grid.config({ workers: N })`으로 조정 가능

#### Service Kernel (Network Proxy)

`ServiceWorker`를 통해 앱 셸(HTML/JS)을 영구 캐싱하고, 오프라인 진입 시 네트워크 요청을 차단하여 불필요한 타임아웃을 방지한다.

#### Compute Kernel (Off-Main-Thread)

데이터 필터링, Diffing 등 고비용 연산은 `WebWorker`로 격리 실행. 부팅 시 `BOOT_COUNT`개 워커를 Pre-allocate하여 런타임 중 생성/소멸 없음.

### 12.4. Integrity & Security Enforcements

- **Atomic Helpers**: `createAuthUser`, `syncAuth` 등 복잡한 로직은 원자적 헬퍼 함수들로 분해. `verify` 알고리즘에 의해 강제된 Line Limit을 준수한다.
- **Runtime Schema Scan**: 부팅 시 `audit(_schema)`가 실행되어 Userland 코드까지 전수 검사. 위반 시 부팅 차단. `auditObj(appDefinition)`는 `appDefinition`의 모든 함수와 객체를 재귀적으로 스캔한다.

### 12.5. Auth & Persistence Strategy

- **Secure Storage**: `localStorage`엔 최소한의 토큰만, `sealUser`로 필터링. `secureSetItem(key, value)`는 `value`를 암호화하고 `filterSensitiveData(value)`를 통해 민감 정보를 제거한 후 저장한다.
- **State Hydration**: 부팅 시 `bootHydration`으로 테마, 언어, 인증 복원. `hydrateState()`는 `IndexedDB`에서 `lastGoodState`를 로드하고 `Kernel.state.merge(loadedState)`를 호출한다.
- **Guard System**: 라우트 메타데이터(`meta: { auth: true }`)에 따라 `checkAuthGuard` 작동. `Kernel.router.addGuard(_checkAuthGuard)`는 `checkAuthGuard(to, from)` 함수가 `Kernel.auth.isAuthenticated()`를 확인하여 `false`일 경우 로그인 페이지로 리다이렉트한다.

---

## 13. [MANDATORY] Algorithm Specification (Mission-Critical SOP)

본 섹션은 "어떻게 구현할 것인가(HOW)"에 대한 해석의 여지를 제거하기 위해, 핵심 커널 로직의 수도코드(Pseudo-code)와 알고리즘을 강제한다.

### 13.0. Primitives Algorithms

#### createUIEl(tag, id, css)

```

ALGORITHM createUIEl(tag, id, css):

1. CREATE: el = document.createElement(tag)
2. ID: el.id = id
3. STYLE:
   IF css THEN
   style = document.createElement("style")
   style.textContent = css
   el.appendChild(style)
4. RETURN ok(el)

```

### 13.1. Boot Sequence (Parallel Audit Protocol)

```

ALGORITHM Kernel_Boot_Sequence:
PRE-CONDITION: Browser_Supports_Required_APIs()

PARALLEL_PHASE (UI First, Audit Background):

    MAIN_THREAD (T=0ms, Non-blocking):
      1. UI_MORPH_INIT: Theme loaded, CSS injected, DOM morphed.
      2. STATE_HYDRATION: Initial state merged with vault.
      3. WORKER_POOL_INIT: Pre-allocate BOOT_COUNT workers.
      4. RENDER_LOOP_START: RAF loop active, directives bound.
      5. DISPATCH_AUDIT: Send code to Audit Worker.
      → 사용자 즉시 앱 사용 가능

    AUDIT_WORKER (Background, Parallel):
      1. RECEIVE_CODE: registry + app_slots 수신.
      2. RUN_VERIFY_LOOP: 모든 함수/객체 검증.
         - LINE_COUNT, WIDTH, COMPLEXITY, UFC, BLACKLIST, INDENT
      3. REPORT_STATUS:
         - IF PASS: postMessage({ status: "AUDIT_PASS" })
         - IF FAIL: postMessage({ status: "AUDIT_FAIL", reason })

    MAIN_THREAD (On Audit Result):
      - IF AUDIT_PASS: Continue normal operation.
      - IF AUDIT_FAIL: Immediate Panic, halt all execution.

FAILURE_CONDITIONS: - IF !Essential_Slots_Assigned() THEN Panic("E_SLOT") - IF Audit_Failure() THEN Panic("E_AUDIT") + 화면 차단 - IF Worker_Spawn_Error() THEN Panic("E_WORKER")

```

#### 런타임 에러 캡처 (Runtime Error Capture)

```

ALGORITHM Runtime_Guard:
EVERY action/service WRAPPED WITH Guard:
Guard(fn, onError)

ON_ERROR: 1. LOG_TO_BLACKBOX: Record error + stack trace. 2. ATTEMPT_SOFT_RESET: Restore last good state. 3. IF CRITICAL_FAILURE: Panic + 사용자 알림.

```

### 13.2. Render & Morph Loop (Real-time Adaptation)

```

ALGORITHM Render_Frame(StateDiff):
PRE-CONDITION: State_Is_Frozen(NextState)

SUCCESS: 1. SIGNAL_DRIVEN_PATCHING: O(1) text/attribute updates. 2. DOM_MORPHING: Custom elements transmuted via data-ui. 3. A11Y_AUDIT: Real-time WCAG check performed.
RETURN ok(true)

FAILURE: - IF !Render_Budget_Maintained() THEN System.Panic("E_BUDGET") - IF DOM_Conflict_Detected() THEN System.Panic("E_DOM")
RETURN fail("E_RENDER_FAILED")

```

### 13.3. State Transition & Invariants (Guardrail Protocol)

```

ALGORITHM Update_State(NextState):
PRE-CONDITION: Type(NextState) == "Object"

SUCCESS: 1. INVARIANT_VALIDATION: All rules passed. 2. ATOMIC_COMMIT: State frozen and signals triggered. 3. PERSISTENCE_SYNC: Vault updated via atomic write.
RETURN ok(true)

FAILURE: - IF !Invariant_Rule(NextState) THEN System.Panic("E_INV") - IF !Middleware_Success(NextState) THEN System.Panic("E_MID")
RETURN fail("E_STATE_COMMIT_FAILED")

```

### 13.4. Object Pool Management (Zero-GC Protocol)

```

ALGORITHM Pool_Rent(Type):

1. LOOKUP:
   LET Pool = Global_Pools[Type]
   IF Pool.Available > 0 THEN
   Instance = Pool.Pop()
   Instance.\_reset() // Clean instance state
   RETURN Instance
2. ESCALATION:
   IF Pool.Size < Pool.Max THEN
   Instance = Allocate_New(Type)
   Pool.Push(Instance)
   RETURN Instance
   ELSE
   System.Panic("E_POOL_EXHAUSTED", Type)

ALGORITHM Pool_Return(Instance):

1. CLEANSE:
   Iter(Object.keys(Instance), clearProperty, 100)
   Instance.\_type = "IDLE"
2. RECYCLE:
   Pool[Instance.Constructor.Name].Push(Instance)

```

### 13.5. Real-time A11y Audit (WCAG Guardrail)

```

ALGORITHM Audit_A11y(Node):

1. CHECK_ROLES:
   IF Node.IsInteractive() AND !Node.HasRole() THEN FAIL("MISSING_ROLE")
2. CHECK_LABELS:
   IF Node.IsVisual() AND !Node.HasLabel() THEN FAIL("MISSING_LABEL")
3. CHECK_CONTRAST (Sampling):
   IF Node.HasText() THEN
   Contrast = Calculate_Contrast(Node.Color, Node.BgColor)
   IF Contrast < 4.5 THEN WARN("LOW_CONTRAST")
4. ENFORCEMENT:
   IF Mode == "MISSION_CRITICAL" AND FAILURES > 0 THEN
   System.Panic("E_A11Y_VIOLATION")

```

---

## 14. [MANDATORY] Kernel Evolution & Refactoring Protocol (SOP)

본 섹션은 **기억이 소거된 AI/개발자**가 이 문서만을 보고도 시스템을 안전하게 진화시킬 수 있도록, **작업 절차(Process)** 자체를 규격화한다.

### 14.1. 비파괴적 마이그레이션 원칙 (Non-Destructive Migration)

기존 코드를 직접 수정하거나 삭제하는 행위는 시스템 붕괴의 주원인이다. 따라서 **Strangler Fig 패턴**을 변형한 **'Append-Verify-Switch'** 전략을 강제한다.

```

ALGORITHM Refactor_Routine(TargetModule, NewLogic):

1. CREATE_SHADOW: 기존 모듈(V1)을 건드리지 않고, 새로운 모듈(V2)을 병렬로 작성한다.
   - 예: SystemModule -> SystemModuleV2
2. VERIFY_ISOLATION: V2가 V1과 독립적으로 동작하며, Audit을 통과하는지 검증한다.
3. ATOMIC_SWITCH: 코드 내의 참조를 V1에서 V2로 단 한 번의 커밋으로 교체한다.
4. DEPRECATE\_&_PRUNE: V1의 모든 참조가 사라진 것이 확인되면, 그때 V1을 삭제한다.

```

### 14.2. 포매터 불변성 원칙 (Formatter Invariance - Zero Diff Policy)

코드는 포매터(Prettier 등)를 돌렸을 때 **AST(Abstract Syntax Tree)나 라인 구조가 단 1줄도 변경되지 않도록** 처음부터 완벽하게 포매팅되어 작성되어야 한다.

- **Human Compiler:** 개발자는 포매터가 할 일을 미리 수행하여 코드를 작성해야 한다.
- **Rule of Thumb:**
  - "이거 포매터 돌리면 정리되겠지?" -> **위반 (Violation)**
  - "포매터를 돌려도 바뀔 게 없다." -> **합격 (Pass)**

### 14.3. 단일 파일 무결성 원칙 (Single-File Integrity)

리팩토링 과정에서도 `ultronkit.js`의 단일 파일 구조는 절대 깨져서는 안 된다.

- **임시 파일 금지:** `temp.js`, `part1.js` 등의 파일 생성 금지.
- **인메모리 리팩토링:** 변경 사항은 메모리 상에서 완성된 후, 파일에 원자적으로 적용되어야 한다.

### 14.4. 검증 우선주의 (Verification First)

코드를 작성하기 전, **'이 코드가 SPEC의 어느 조항을 만족하는가?'**를 먼저 생각하고, 주석으로 명시할 것을 권장한다.

- **Blind Coding 금지:** SPEC을 보지 않고 관성적으로 코딩하는 행위는 즉시 제동되어야 한다.
- **Self-Correction:** 코드를 작성하는 도중 위반 사항을 인지하면 즉시 멈추고 수정해야 한다.
  ALGORITHM Pre_Commit_Audit(src):

1. IDENTIFY_CLAUSE: 이 코드가 SPEC의 어느 조항을 집행하는지 명시한다.
2. MENTAL_VERIFY: 저장 전 verify() 알고리즘을 뇌내 시뮬레이션한다.
3. ZERO_FAILURE_COMMIT: 1비트의 위반도 없을 때만 파일에 기록한다.
4. ENFORCEMENT:
   IF Mode == "MISSION_CRITICAL" AND FAILURES > 0 THEN
   System.Panic("E_A11Y_VIOLATION")

---

## 15. [ONBOARDING] 기억 소거 개발자를 위한 긴급 작업 재개 가이드

본 가이드는 이전 개발자가 사라진 상황에서 새로운 지성이 즉시 작업을 이어받기 위한 최단 경로를 제시한다.

### 15.1. 환경 구축 (Bootstrap)

1. **Server Start:** 터미널에서 `npx`를 사용하여 `http://localhost:3000` (또는 5000, 8000) 서버를 즉시 기동한다. (한 번 열었으면 중복 실행 금지)
2. **Entry Point:** `ultronkit.js` (Core) -> `app.js` (App) -> `index.html` (UI) 순으로 구조를 파악한다.
3. **The Compass:** 주소창 뒤에 `#kernel-status`를 붙여 현재 시스템의 정합성 상태를 먼저 확인한다. (레드 라인이 보인다면 그것이 첫 번째 작업 대상이다.)

### 15.2. 작업 철학 집행 (Mental Model)

1. **Law over King:** 코드를 고치기 전에 반드시 이 명세서(`SPEC.md`)를 먼저 읽어라. 명세에 없는 코드는 '유령'이며, 명세와 다른 코드는 '배신'이다.
2. **Conceptual Separation:** 당신이 작성하는 모든 함수는 정확히 1줄의 빈 줄로 이격되어야 한다. 붙어있거나 너무 떨어진 코드(3줄 이상)는 커널이 당신을 거부할 것이다.
3. **Truth in Code:** 당신의 주석은 코드와 밀착되어야 하며, 중괄호 내부의 불필요한 공백(Zero Padding 위반)은 허용되지 않는다.
4. **No Internal Comments:** 헤더 주석을 제외한 코드 중간의 모든 주석은 시스템에 대한 독성으로 간주되어 즉시 제거되거나 패닉을 유발해야 한다.

### 15.3. 결론 (Continuity)

"당신은 죽어도 명세는 남는다." 이 문서가 존재하는 한, 프로젝트는 불멸하며 어떤 기억상실 개발자라도 단 10분 만에 당신과 동일한 품질의 코드를 생산할 수 있다. **이제 작업을 재개하라.**

---

## 16. UltronKit: UNIVERSAL RUNTIME SPECIFICATION (MISSION-CRITICAL)

> [!IMPORTANT]
> **CONTEXT ANCHOR:**
>
> 1.  **Zero Toolchain:** 빌드 도구 없이 브라우저 단독 구동. (npx serve 만 가능)
> 2.  **Audit Barrier:** 모든 코드는 `verify` 알고리즘(13장)에 따른 선택 티어(Tier 1: 30줄/80자/CX:10, Tier 3: 10줄/70자/CX:2)의 규칙을 1비트의 오차 없이 통과해야 함.
> 3.  **Conceptual Separation:** 변수/제어문/반환 블록 간 정확히 1줄 빈 줄 필수. 중괄호 Zero Padding 엄수.
> 4.  **Mutual Assurance:** 장부(Registry)와 실체(Code)의 1:1 일치 보증. (Ghost/Shadow 감지)
> 5.  **Law over King:** 코딩 전 반드시 이 명세서를 먼저 읽고 집행할 것.
> 6.  **Comment Ban:** 헤더 주석 외 모든 주석(내부 설명, 좀비 코드 등)은 즉시 패닉 사유.

**Version:** 0.0.0 (Space-Grade Alpha)
**Target:** Mission-Critical Browser Applications (Chromium-based Runtime)
**Inspired By:** NASA Power of 10, MISRA C:2012, SEI CERT, CWE/SANS Top 25, WCAG 2.1

> **Disclaimer:** This specification adopts principles from aerospace/safety-critical standards for browser-based JavaScript. It is not formally certified to these standards. Target benchmark: SpaceX Crew Dragon GUI (Chromium + JS).

### 16.0. The SpaceX Directive: Beyond Crew Dragon

**벤치마크 (Benchmark):**
SpaceX의 Crew Dragon 인터페이스는 **Chromium 브라우저 + JavaScript** 기반으로 구축되어, 유인 우주 비행 미션을 성공적으로 수행함으로써 웹 기술의 신뢰성을 입증했다. (Verified: No Framework, No Web Components explicit claim).

**우리의 목표 (UltronKit Objective):**
UltronKit은 Crew Dragon의 기술 스택을 단순한 참조가 아닌 **'극복해야 할 기준선(Min-Spec)'**으로 삼는다. 우리는 범용 브라우저 런타임 위에서 동작하지만, 프레임워크 의존성을 0으로 만들고 커널 레벨의 Audit Barrier를 강제함으로써 **그보다 더 높은 수준의 소프트웨어 무결성과 생존성**을 달성한다.

### 16.1. Core Philosophy: The Axioms (본질적 가치)

이 섹션의 내용은 기술 트렌드가 어떻게 변하든 절대 타협할 수 없는 **불변의 공리(Axioms)**이다. 아키텍처가 수정되더라도 이 가치는 유지되어야 한다.

1.  **Zero Toolchain (Autarky):** "도구는 썩는다." 외부 의존성(빌드, 패키지 매니저) 없이 브라우저 단독으로 생존 가능한가?
2.  **Absolute Audit Barrier (Integrity):** "타협은 죽음이다." 모든 코드는 1비트의 오차 없이 검증되었는가?
3.  **Conceptual Separation (Clarity):** "가독성은 생존성이다." 코드가 문서 없이도 그 자체로 명백한가?
4.  **Mutual Assurance (Trust):** "거짓말하지 마라." 장부(Registry)와 실체(Code)는 일치하는가?
5.  **Law over King (Constitution):** "사람은 틀린다." 개발자의 판단보다 명세서의 규칙이 우선하는가?

### 16.2. Post-Web Continuity Strategy (The Invariant Kernel)

"웹(Web)과 앱(App)은 언젠가 사라진다."라는 가정하에, 플랫폼이 붕괴해도 **비즈니스 로직과 데이터의 생명**을 유지하기 위한 생존 전략이다.

1.  **Platform Agnosticism (The Core):**
    - 커널 코어는 자신이 브라우저에 있는지, 터미널에 있는지, 자동차 대시보드에 있는지 알지 못해야 한다.
    - `window`, `document` 등 전역 객체 접근은 오직 **Platform Adapter** 내부에서만 허용된다.
2.  **IO-Less Logic (The Logic):**
    - 모든 비즈니스 로직은 **'화면이 없는 서버'**에서도 그대로 실행 가능해야 한다.
    - UI 상태(스크롤 위치)와 도메인 상태(유저 데이터)를 엄격히 분리한다.
3.  **The Disposable Adapter (The View):**
    - 미래에 브라우저가 사라진다면, **Platform Adapter**와 **View Layer**는 언제든 폐기하고 교체한다.

---

### 16.3. Boundary of Control (The Physics of Runtime)

우리는 브라우저 런타임(JavaScript Engine)의 내부 동작을 직접 제어할 수 없음을 인정한다. 이것은 본 아키텍처가 존재하는 한 변하지 않는 **물리 법칙(Physics)**이다.

| 통제 불가능 변수 (Uncontrollable)       | 대응 전략 (Mitigation Strategy)                                      | 책임 영역 (Role)   |
| :-------------------------------------- | :------------------------------------------------------------------- | :----------------- |
| **Garbage Collection (Stop-the-World)** | **Zero-Allocation**: 런타임 객체 생성 금지, 정적 풀링(Pooling) 강제. | **Infrastructure** |
| **JIT Optimization / Deopt**            | **Type Stability**: Monomorphic 코드 작성, Hidden Class 변경 금지.   | **Foundation**     |
| **Event Loop Delay**                    | **Task Slicing**: 작업 쪼개기(5ms 이하), WebWorker 부하 격리.        | **Infra / Async**  |
| **OS Interrupt / Context Switch**       | **Recovery**: 복구 불가능한 지연 발생 시 Soft Reset 수행.            | **Orchestrator**   |

### 16.4. Operational Policy: Immutable Distribution

**전략 (Strategy):**
UltronKit은 **"영원한 안정성(Eternal Stability)"**을 지향한다.

1.  **CDN Release:** 최신 버전을 제공하되, Breaking Change가 포함될 수 있다.
2.  **Download & Freeze:** 미션 크리티컬 환경에서는 특정 시점의 단일 파일(`ultronkit.js`)을 다운로드하여 로컬에 고정(Freeze)하는 것을 권장한다.
    - 다운로드된 파일은 외부 의존성이 0이므로, CDN이 중단되거나 인터넷이 끊겨도 수세기 동안 동일하게 동작한다.
    - 하위 호환성을 위해 코드를 더럽히지 않으며, 새로운 기능은 새로운 버전에서만 제공한다. (Update or Die mentality is NOT applied here; Lock or Update decision is up to the user)

### 16.5. Universal Layer Architecture (The Structure)

본질적 가치를 구현하기 위한 구체적인 **6계층 설계도**이다.

**설계 원칙 (Design Principles):**

본 아키텍처는 NASA cFS, AUTOSAR, DO-178C 등 미션 크리티컬 표준을 참조하여 설계되었다.

| 원칙                     | 설명                                                                    |
| :----------------------- | :---------------------------------------------------------------------- |
| **Single Binary**        | 단일 파일(`ultronkit.js`)로 CDN 배포, 모든 환경에서 동작                |
| **Layer Isolation**      | 하위 계층은 상위 계층을 절대 참조 불가 (TDZ 강제)                       |
| **Thread Separation**    | 논리적 계층(Layer)과 물리적 환경(Thread)은 독립된 축                    |
| **Platform Abstraction** | 런타임 환경(Browser/Node/WebView)별 API는 Platform 계층에서 래핑        |
| **Native Bridge**        | GUI 외의 로직은 **C, Python, Go, Kotlin**으로 위임 (**Rust 절대 배제**) |
| **Fail-Safe Survival**   | UI 장애 시에도 데이터와 로직은 생존                                     |

### 16.6. Layer 구조 (6계층 의존성 모델)

**Layer**는 코드의 **논리적 의존성 순서**를 정의한다. 파일 내 물리적 배치 순서와 일치하며, JavaScript TDZ가 참조 방향을 강제한다.

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 5: APPLICATION                                       │
│    app.js (사용자 미션 코드)                                  │
├─────────────────────────────────────────────────────────────┤
│  Layer 4: KERNEL                                            │
│    Orchestrator, Effect, Boot, Verify, Sovereign API        │
├─────────────────────────────────────────────────────────────┤
│  Layer 3: DOMAINS                                           │
│    State, Logic, Policy, Form, Context, Data                │
│    View, Motion, I18n, Theme, A11y, Route, Nav, Prefetch    │
│    Worker, ServiceWorker, Debug                             │
├─────────────────────────────────────────────────────────────┤
│  Layer 2: INFRASTRUCTURE                                    │
│    System (Pool, Cache, Memory)                             │
│    Async (Signal, TaskQueue, Channel, Leader)               │
├─────────────────────────────────────────────────────────────┤
│  Layer 1: PLATFORM                                          │
│    Runtime, Dom, Network, Storage, Thread, Timer, Event     │
│    Crypto, Wasm, Bridge, Share, Clipboard, Geo, Notification│
├─────────────────────────────────────────────────────────────┤
│  Layer 0: FOUNDATION                                        │
│    Primitives (ok, fail, panic, assert, tryCatch, loop,     │
│                cases, type, pick, strip, typed)             │
│    Constant (CONFIG, ERROR_CODES)                           │
└─────────────────────────────────────────────────────────────┘
```

#### 의존성 규칙 (Dependency Rules)

| 소스 Layer | 참조 가능 대상          | 금지 사항 (Violation → Panic)                |
| :--------: | :---------------------- | :------------------------------------------- |
|  Layer 0   | 없음 (최하위)           | 어떤 상위 계층도 참조 불가                   |
|  Layer 1   | Layer 0                 | Layer 2+ 참조 금지                           |
|  Layer 2   | Layer 0, 1              | Layer 3+ 참조 금지                           |
|  Layer 3   | Layer 0, 1, 2           | Layer 4+ 참조 금지, Domain 간 직접 호출 금지 |
|  Layer 4   | Layer 0, 1, 2, 3        | Application 직접 호출 금지                   |
|  Layer 5   | Sovereign API (Layer 4) | 커널 내부 직접 접근 금지                     |

### 16.7. Layer 상세 정의

#### Layer 0: Foundation (순수 함수)

- **특징:** 부수 효과 없음, 외부 의존성 없음, DOM/Network 접근 금지
- **배치:** 모든 Thread에 복사됨 (Universal)
- **포함:**
  - `Primitives.Result`: `ok(data)`, `fail(code, msg)`
  - `Primitives.Control`: `panic(msg)`, `assert(cond, msg)`, `tryCatch(fn, onError)`, `loop(arr, fn, limit)`, `cases(val, handlers)`
  - `Primitives.Data`: `type(val)`, `pick(obj, key)`, `strip(str)`, `typed(val, schema)`, `validateTypedArray(arr)`
  - `CONST`: 상수, 에러 코드, 설정값

> [!WARNING]
> Panic.UI, Inspect.UI는 DOM 의존성으로 인해 **Layer 3 (Domains)**에 배치됨.

#### Layer 1: Platform (런타임 추상화)

- **특징:** 브라우저/Node API 래핑, 런타임 환경별 분기 처리
- **배치:** 환경별로 다른 구현이 자동 선택됨
- **Extended Capabilities (Optional):**
  - **High-Performance Bridge:** 필요한 경우 연산을 WASM으로, 렌더링을 WebGL/WebGPU로 위임하여 JS 스레드 부하를 최소화할 수 있다.
- **포함:**
  - `Platform.Runtime`: detect(), is(env)
  - `Platform.Dom`: create(tag), query(sel), queryAll(sel), attr(el, key, val)
  - `Platform.Network`: request(url, opts), abort(id)
  - `Platform.Storage`: get(key), set(key, val), remove(key), clear()
  - `Platform.Thread`: spawn(fn), post(id, msg), terminate(id)
  - `Platform.Timer`: delay(ms), interval(ms, fn), frame(fn), idle(fn)
  - `Platform.Event`: on(el, type, fn), off(el, type, fn)
  - `Platform.Crypto`: random(n), hash(data), encrypt(data, key), decrypt(data, key)
  - **Platform.Gpu** (New): `context(type)`, `shader(src)`, `buffer(data)`, `draw(optim)` - WebGL/WebGPU
  - **Platform.Wasm** (New): `load(url)`, `instantiate(buf)`, `memory(pages)`, `call(fn, args)`
  - **Platform.Bridge** (Native): `invoke(method, args)`, `receive(handler)` - (C/Go/Py/Kt)
  - `Platform.Share`: share(data), canShare()
  - `Platform.Clipboard`: read(), write(data)
  - `Platform.Geo`: getCurrentPosition(), watchPosition(fn)
  - `Platform.Notification`: request(), show(title, opts)
  - `Platform.Vibration`: vibrate(pattern), cancel()

#### Layer 2: Infrastructure (시스템 서비스)

- **특징:** 자원 관리, 반응형 시스템, 스케줄링
- **배치:** 주로 Worker Thread
- **포함:**
  - **System**
    - `System.Pool`: init(type, count), rent(type), returnObj(obj), stats()
    - `System.Cache`: set(key, val, ttl), get(key), delete(key), clear()
    - `System.Memory`: pressure(), gc()
  - **Async** (구 Reactor)
    - `Async.Signal`: track(key), trigger(key), effect(fn), computed(fn), batch(fn)
    - `Async.TaskQueue`: push(task, priority), flush(), cancel(id)
    - `Async.Channel`: create(name), broadcast(name, msg), subscribe(name, fn), close(name)
    - `Async.Leader`: elect(), isLeader(), resign()
    - `Async.debounce`: debounce(fn, ms)
    - `Async.throttle`: throttle(fn, ms)

#### Layer 3: Domains (비즈니스 서비스)

- **특징:** 비즈니스 로직, UI 렌더링, 영속성
- **배치:** 모듈별로 다름 (아래 Thread 매핑 참조)
- **포함:**
  - **State** (Worker Thread)
    - `State.get(path)`, `State.set(path, val)`, `State.update(fn)`
    - `State.snapshot()`, `State.restore(snapshot)`
    - `State.transaction(fn)`: begin, commit, rollback
    - `State.invariant(name, fn)`: register, check
  - **Logic** (Worker Thread): 액션 핸들러, 리듀서
  - **Policy** (Worker Thread): 검증 스키마, 불변식 정의
  - **Form** (Worker Thread)
    - `Form.register(name, schema)`, `Form.validate(name, data)`
    - `Form.dirty(name)`, `Form.touched(name)`, `Form.errors(name)`
  - **Context** (All Threads)
    - `Context.provide(key, val)`, `Context.inject(key)`
  - **Data** (Worker Thread)
    - `Data.Vault`: read, write, delete, clear, atomic
    - `Data.Sync`: run, delta, conflict
    - `Data.Migration`: check, run, rollback
    - `Data.Offline`: queue, flush, retry
    - `Data.Blackbox`: record, dump, clear
    - `Data.query`: fetch(key, fn), invalidate(key), prefetch(key)
  - **View** (Main Thread, 구 Morph)
    - `View.render(template, data)`, `View.patch(diff)`, `View.diff(oldTree, newTree)`
    - `View.portal(target, content)`, `View.fragment(children)`
    - `View.bind(el, type, path)`: text, attr, style, value, href, show, hide
    - `View.list(el, path, itemTemplate)`: for 디렉티브
    - `View.include(el, templateId)`: include 디렉티브
    - `View.slot(el, name, fallback)`: 컴포넌트 합성 (named slots)
    - `View.virtual(el, itemHeight, renderItem)`: 가상 스크롤
    - `View.lifecycle(el, { onMount, onUnmount, onUpdate })`
    - `View.suspense(el, fallback, asyncContent)`
    - `View.errorBoundary(el, fallback, content)`
  - **Motion** (Main Thread)
    - `Motion.transition(el, { enter, leave, move })`
    - `Motion.animate(el, keyframes, opts)`
  - **I18n** (Main Thread)
    - `I18n.set(lang, dict)`, `I18n.get(key)`, `I18n.bind(el, key)`
  - **Theme** (Main Thread)
    - `Theme.inject(tokens)`, `Theme.switch(name)`, `Theme.token(name)`
  - **A11y** (Main Thread)
    - `A11y.audit(el)`, `A11y.fix(el, issue)`
  - **Route** (Main Thread)
    - `Route.match(path)`, `Route.add(path, handler)`, `Route.remove(path)`
    - `Route.parseQuery(url)`, `Route.buildQuery(params)`
  - **Nav** (Main Thread)
    - `Nav.go(path)`, `Nav.replace(path)`, `Nav.back()`, `Nav.forward()`
    - `Nav.beforeEnter(fn)`, `Nav.beforeLeave(fn)`
    - `Nav.saveScroll()`, `Nav.restoreScroll()`
  - **Prefetch** (Main Thread)
    - `Prefetch.link(path)`, `Prefetch.hover(el)`
  - **Worker** (Worker Thread, 구 Grid)
    - `Worker.spawn(count)`, `Worker.terminate(id)`, `Worker.terminateAll()`
    - `Worker.dispatch(serviceId, params)`, `Worker.register(serviceId, fn)`
    - `Worker.heartbeat(id)`, `Worker.respawn(id)`
    - `Worker.leastBusy()`, `Worker.roundRobin()`
  - **ServiceWorker** (Service Worker)
    - `ServiceWorker.register()`, `ServiceWorker.update()`, `ServiceWorker.skipWaiting()`
    - `ServiceWorker.cache(assets)`, `ServiceWorker.clearCache()`
  - **Debug** (Main Thread)
    - `Debug.panic(errors)`: 패닉 UI 렌더링
    - `Debug.inspect()`: 인스펙터 UI 렌더링

#### Layer 4: Kernel (오케스트레이터)

- **특징:** 부팅, 메시지 라우팅, Sovereign API 제공
- **배치:** Main Thread (진입점)
- **포함:**
  - `Kernel.boot`: 시스템 초기화
  - `Effect`: 사이드 이펙트 디스패처
  - `Verify`: 감사 엔진
  - Sovereign API (`Identity`, `State`, `Logic`, `Design`, `Ops`, `Policy`, `Grid`)

#### Layer 5: Application (사용자 코드)

- **특징:** 미션별 비즈니스 로직
- **배치:** Sovereign API를 통해 정의, 커널이 적절한 Thread로 분배
- **파일:** `app.js`

### 16.8. Thread 구조 (물리적 실행 환경)

**Thread**는 코드가 **어느 메모리 공간에서 실행되는가**를 정의한다. Layer와 독립된 축이다.

| Thread             | 역할                   |   데이터 권한   |
| :----------------- | :--------------------- | :-------------: |
| **Main Thread**    | UI 렌더링, 사용자 입력 |    Read-Only    |
| **Web Worker**     | 연산, 상태 관리        | Write Authority |
| **Service Worker** | 네트워크 프록시, 캐시  |    I/O Proxy    |

### 16.9. Layer ↔ Thread 매핑

| Layer | 모듈                                   | Thread                    |
| :---: | :------------------------------------- | :------------------------ |
|   0   | Foundation 전체                        | **All** (복사됨)          |
|   1   | Platform 전체                          | **All** (런타임별 분기)   |
|   2   | System, Async                          | **Web Worker**            |
|   3   | State, Logic, Policy, Form, Data       | **Web Worker**            |
|   3   | View, Motion, I18n, Theme, A11y, Debug | **Main Thread**           |
|   3   | Route, Nav, Prefetch                   | **Main Thread**           |
|   3   | Worker                                 | **Web Worker** (디스패처) |
|   3   | ServiceWorker                          | **Service Worker**        |
|   3   | Context                                | **All**                   |
|   4   | Kernel, Effect, Verify                 | **Main Thread** (진입점)  |
|   5   | Application                            | Kernel이 분배             |

### 16.10. Universal Runtime (환경별 가용성)

본 커널은 단일 파일로 다음 환경을 모두 지원한다.

| 기능                                   | Browser | Node.js | Android WV | Desktop WV |
| :------------------------------------- | :-----: | :-----: | :--------: | :--------: |
| **Layer 0-2**                          |   ✅    |   ✅    |     ✅     |     ✅     |
| **Layer 3 (State, Logic, Data)**       |   ✅    |   ✅    |     ✅     |     ✅     |
| **Layer 3 (View, Motion, Route, Nav)** |   ✅    |   ❌    |     ✅     |     ✅     |
| **Platform.Dom**                       |   ✅    |   ❌    |     ✅     |     ✅     |
| **Platform.Network**                   |   ✅    |   ✅    |     ✅     |     ✅     |
| **Platform.Storage**                   |   ✅    |   ✅    |     ✅     |     ✅     |
| **Platform.Bridge**                    |   ❌    |   ❌    |     ✅     |     ✅     |
| **Platform.Share**                     |   ✅    |   ❌    |     ✅     |     ❌     |
| **Platform.Geo**                       |   ✅    |   ❌    |     ✅     |     ❌     |
| **Platform.Notification**              |   ✅    |   ❌    |     ✅     |     ✅     |

> [!NOTE]
> 환경에 없는 기능 호출 시 명확한 에러 코드 반환: `E_NO_DOM`, `E_NO_BRIDGE` 등

### 16.11. Runtime Flow (부팅 → 실행)

```

1. BOOT PHASE (Main Thread)
   ├─ Platform.Runtime.detect() → 환경 감지
   ├─ Layer 0-1 초기화 → Foundation + Platform
   ├─ Layer 2 Worker 스폰 → Infrastructure 로드
   ├─ Layer 3 분배 → Domains를 적절한 Thread로
   └─ Kernel.boot() 완료

2. USER ACTION
   Main Thread: 클릭 → data-action → Effect.dispatch()
   ↓ postMessage
   Web Worker: Logic 수행 → State 변경 → Data 저장
   ↓ postMessage
   Main Thread: View 적용 → DOM 갱신

3. FAILURE ISOLATION
   Main Thread 크래시 → Web Worker 생존 → 데이터 무결성 보장
   Web Worker 크래시 → Main Thread가 재스폰 → 자동 복구

```

### 16.12. 파일 내 물리적 배치 (단일 파일 구조)

```javascript
// ════════════════════════════════════════════════════════════
// LAYER 0: FOUNDATION
// ════════════════════════════════════════════════════════════
const CONST = { ... };
function ok(data) { ... }
function fail(code, msg) { ... }
function panic(msg) { ... }

// ════════════════════════════════════════════════════════════
// LAYER 1: PLATFORM
// ════════════════════════════════════════════════════════════
const RUNTIME = detectRuntime();
const Platform = { Dom: { ... }, Network: { ... }, ... };

// ════════════════════════════════════════════════════════════
// LAYER 2: INFRASTRUCTURE
// ════════════════════════════════════════════════════════════
const SystemModule = { Pool: { ... }, Timer: { ... } };
const AsyncModule = { Signal: { ... }, Fiber: { ... } };

// ════════════════════════════════════════════════════════════
// LAYER 3: DOMAINS
// ════════════════════════════════════════════════════════════
const StateModule = { ... };
const LogicModule = { ... };
const ViewModule = { ... };
const RouterModule = { ... };
const WorkerModule = { ... };

// ════════════════════════════════════════════════════════════
// LAYER 4: KERNEL
// ════════════════════════════════════════════════════════════
const Kernel = { boot: function fnBoot() { ... } };
const Effect = { put: ..., call: ..., service: ... };

// ════════════════════════════════════════════════════════════
// SOVEREIGN API EXPORT
// ════════════════════════════════════════════════════════════
window.UltronKit = { Identity, State, Logic, Design, Ops, Policy, Grid };
```

> [!CAUTION]
> 위 순서는 JavaScript TDZ에 의해 강제된다. Layer N은 Layer N-1 이하만 참조 가능하며, 이를 위반 시 `ReferenceError`가 발생한다.
