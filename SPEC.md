# UltronKit: UNIVERSAL RUNTIME SPECIFICATION (MISSION-CRITICAL)

> [!IMPORTANT]
> **CONTEXT ANCHOR:**
>
> 1.  **Zero Toolchain:** 빌드 도구 없이 브라우저 단독 구동. (npx serve 만 가능)
> 2.  **Audit Barrier:** 모든 코드는 `verify` 알고리즘에 따른 선택 티어(Tier 1: 30줄/80자/CX:10, Tier 3: 10줄/70자/CX:2)의 규칙을 1비트의 오차 없이 통과해야 함.
> 3.  **Conceptual Separation:** 변수/제어문/반환 블록 간 정확히 1줄 빈 줄 필수. 중괄호 Zero Padding 엄수.
> 4.  **Mutual Assurance:** 장부(Registry)와 실체(Code)의 1:1 일치 보증. (Ghost/Shadow 감지)
> 5.  **Law over King:** 코딩 전 반드시 이 명세서를 먼저 읽고 집행할 것.
> 6.  **Comment Ban:** 헤더 주석 외 모든 주석(내부 설명, 좀비 코드 등)은 즉시 패닉 사유.

**Version:** 0.0.0 (Space-Grade Alpha)
**Target:** Mission-Critical Browser Applications (Chromium-based Runtime)
**Inspired By:** NASA Power of 10, MISRA C:2012, SEI CERT, CWE/SANS Top 25, WCAG 2.1, NASA cFS, AUTOSAR, DO-178C

> **Disclaimer:** This specification adopts principles from aerospace/safety-critical standards for browser-based JavaScript. It is not formally certified to these standards. Target benchmark: SpaceX Crew Dragon GUI (Chromium + JS).

---

## 1. Universal Runtime Specification

### 1.1. The SpaceX Directive: Beyond Crew Dragon

**벤치마크 (Benchmark):**
SpaceX의 Crew Dragon 인터페이스는 **Chromium 브라우저 + JavaScript** 기반으로 구축되어, 유인 우주 비행 미션을 성공적으로 수행함으로써 웹 기술의 신뢰성을 입증했다. (Verified: No Framework, No Web Components explicit claim).

**우리의 목표 (UltronKit Objective):**
UltronKit은 Crew Dragon의 기술 스택을 단순한 참조가 아닌 **'극복해야 할 기준선(Min-Spec)'**으로 삼는다. 우리는 범용 브라우저 런타임 위에서 동작하지만, 단순 가이드라인을 넘어 감사 장벽(Audit Barrier) 통과 실패 시 시스템의 존재 자체를 거부하는 **출검 봉쇄(Clearance Block)** 메커니즘을 통해 그보다 더 높은 수준의 소프트웨어 무결성과 생존성을 달성한다.

---

### 1.2. Core Philosophy: The Axioms (본질적 가치)

이 섹션의 내용은 기술 트렌드가 어떻게 변하든 절대 타협할 수 없는 **불변의 공리(Axioms)**이다. 아키텍처가 수정되더라도 이 가치는 유지되어야 한다.

1.  **Zero Toolchain (Autarky):** "도구는 썩는다." 외부 의존성(빌드, 패키지 매니저) 없이 브라우저 단독으로 생존 가능한가?
2.  **Absolute Audit Barrier (Integrity):** "타협은 죽음이다." 모든 코드는 1비트의 오차 없이 검증되었는가?
3.  **Conceptual Separation (Clarity):** "가독성은 생존성이다." 코드가 문서 없이도 그 자체로 명백하며 빈 줄 하나까지 규격화되어 있는가?
4.  **Mutual Assurance (Trust):** "거짓말하지 마라." 장부(Registry)와 실체(Code)는 일치하는가?
5.  **Law over King (Constitution):** "사람은 틀린다." 개발자의 판단보다 명세서의 규칙이 우선하는가?
6.  **Absolute Boundary Enforcement (Isolation):** "경계는 물리적이다." 계층 간 접근 제한이 언어적/물리적으로 강제되는가?
7.  **Finality (최종성):** 부팅 후 제로 할당(Zero-Allocation) 및 비분기 선형 로직을 통해 '상수의 세계'를 지향하는가?

### 1.3. Boundary Enforcement: 계층 격리 강제 수단

계층과 모듈 간의 격리는 신사협정이 아닌 **물리적/논리적 장벽(Blockade)**으로 구현되며, 다음 수단들을 동시 적용하여 강제한다.

| 강제 원칙 (Principle)  | 물리/논리 수단 (Mechanics)   | 격리 효과 (Isolation Effect)                   | 필수 |
| :--------------------- | :--------------------------- | :--------------------------------------------- | :--: |
| **인과적 참조 순서**   | **TDZ** (Temporal Dead Zone) | 정의 전 상위 계층 참조를 엔진 레벨에서 차단    |  ✅  |
| **실행 컨택스트 격리** | **IIFE / Closure**           | 모듈 내부 변수의 외부 유출을 물리적 차단       |  ✅  |
| **사후 변조 동결**     | **Object.freeze()**          | 부팅 후 시스템 구조 및 상수 변조를 영구 차단   |  ✅  |
| **의존성 주입**        | **Factory Pattern**          | 비인접 레이어에 대한 직접적인 접근 권한 제어   |  ✅  |
| **비공개 접근권한**    | **Access Key (Symbol)**      | 유효한 키(Token) 없이 내부 기능 호출 차단      |  ⚠️  |
| **구조적 정적 감사**   | **Verify.audit()**           | 부팅 시 코드의 참조 패턴과 규칙 준수 전수 분석 |  ✅  |
| **봉인 구역 격리**     | **Sealed Zone (Wrapper)**    | 금지 키워드의 영향력을 전용 래퍼 내로 한정     |  ✅  |

> [!CAUTION]
> 위 수단 중 하나라도 누락되면 계층 경계가 무력화될 수 있다. 모든 수단을 **중첩 적용**하는 것이 원칙이다.

**※ 명칭의 유연성:** 본 섹션의 명칭은 격리 원칙과 역할을 설명하기 위한 일반 명사이다. 구현 시 해당 언어나 시스템의 특성을 더 잘 반영하는 더 나은 명사가 있다면 이를 사용할 수 있으며, 명세서의 이름을 코드에 그대로 강제하지 않는다.

### 1.4. Universal Module Axioms & Recursive Integrity (모듈 공리 및 재귀적 무결성)

모듈은 시스템 무결성을 증명하는 최소 원자 단위이며, 명세서와 코드 간의 **1:1 추적성**과 **이중 강제 체계**를 통해 그 실체가 정의된다.

1.  **Axiom of Traceability (추적 가능성):** 모든 모듈과 기능은 본 명세서(SPEC.md)와 물리적으로 1:1 대응되어야 한다. 문서에 정의된 고유 ID가 없는 코드는 존재할 수 없으며, 코드에 구현되지 않은 문서상의 기능은 즉시 결함으로 간주한다.
2.  **Hard-coded ID System:** 모든 모듈은 **Module ID**를, 모듈 내 최상위 기능(Public/Internal)은 **Function ID**를 하드코딩으로 보유해야 한다. 레지스터 등록 시 `기명 함수의 이름`과 `Function ID`를 한 쌍으로 묶어 하드코딩함으로써 실체와 장부의 일치를 보장한다.
3.  **Mutual Assurance (상호 보증):** 장부(Registry)와 실체의 일치를 확인하는 GHOST/SHADOW 감지 로직은 단순한 기능이 아닌, 시스템 존립의 필수 공리로서 모든 레이어에 강제된다.
4.  **Axiom of Recursive Hard-coded Registry:** 무결성은 소스코드 수준에서의 **물리적 중첩 기록**으로 보증된다. 각 모듈의 3단 기능 리스트는 상위 레이어 및 글로벌 장부에 그대로 중복 기입(Mirroring)되어야 한다.
5.  **Dual-Layer Enforcement (이중 강제):**
    - **Intrinsic (기저 런타임):** 브라우저 엔진이 제공하는 Scope, TDZ, Closure 등의 물리 법칙을 최우선으로 활용하여 계층을 격리한다.
    - **Extrinsic (논리적 감사):** 기저 엔진이 잡지 못하는 '추적성 불일치' 및 '설계 위반'은 부팅 시점의 정적 분석을 통해 차단(Boot-Lock)한다.

**[모듈 내부의 3층 기능 위계 (Functional Hierarchy)]**

모듈은 자신의 함수 조각들을 성격과 지휘 체계에 따라 다음의 위계로 구분하여 장부에 기록한다. 모든 호출은 상위에서 하위로만 흐른다.

- **Public (노출 최상구):** 모듈 외부(타 레이어/모듈)와 맺은 계약 기능군. 외부 호출의 유일한 진입점이다.
- **Internal (비노출 최상구):** 외부에 은닉되어 있으나 모듈의 핵심 미션을 집행하고 원자 함수들을 조율하는 실질적 지휘관 기능군.
- **Atomic (최소 원자구):** 품질 기준(10줄 이하 등)을 맞추기 위해 쪼개진, 더 이상 논리적으로 분할 불가능한 실제 연산 단위군. 상위 공용 장부로 승격될 수 있는 대상이다.

**[Registry: 기저 법전의 물리적 우위]**

- **물리적 배치:** `Registry`는 **`Layer 1 (Fundamental Base)`**의 정점이자 첫 번째 코드로 위치한다.
- **인과적 우위:** 시스템 내 모든 존재(`System`, `Layer`, `Module`, `Func)는 선언과 동시에 `Registry`를 통과해야 한다. 이는 단순 로직이 아닌 모든 레이어의 존재를 규정하는 **'물리적 우주 상수'**이자 **'코드 법전'**이다.

**[장부 법전의 언어적 강제 (Registry Statute)]**

장부 선언은 유연한 객체 리터럴이 아닌, 언어적으로 봉인된 **'Registry Statute'** 구조체를 통해서만 가능하다.

1.  **ID 명명 규약 (Axiom of ID):** `SYS_` (시스템), `L_` (레벨), `MOD_` (모듈), `F_` (기능) 프리픽스를 사용한다. **논리적 식별자(함수/변수) 명칭에는 언더스코어 사용을 금지하나, 장부 ID에는 물리적 구분과 시각적 명확성을 위해 언더스코어(\_) 사용을 필수화하여 상징적 상숫값임을 명시한다.** 모든 ID는 명세서 내 색인과 물리적으로 일치해야 한다.
2.  **Linguistic Lockdown:** `Registry.System`, `Registry.Layer`, `Registry.Module`, `Registry.Func`라는 기저 생성기(Sealed Factory)를 사용하여 구조를 물리적으로 구속한다.
3.  **구문적 하드코딩 (Syntactic Redundancy):** 무결성은 데이터 복제가 아닌 **소스 텍스트의 물리적 중복**으로 강제된다. 상위 위계는 하위 위계의 식별 정보(ID, Name, Signature)를 반드시 자기 자신의 코드 파일 내에 직접 하드코딩으로 중복 보유해야 한다.
4.  **삼중 물리 대조 (The Triple Check):** 감사 엔진(`Verify.audit`)은 [장부 간 텍스트], [함수 물리 지문], [로드된 실체 객체]의 삼위일체를 전수 조사한다. 1비트의 불일치(Mismatch/Shadow/Ghost)가 발견되면 부팅을 즉시 차단(Boot-Lock)한다.

**[장부 구조체 명세 (Registry Schema)]**

모든 위계는 구조적 대칭성과 물리적 지문을 엄수해야 한다.

- **Func Spec:** `{ id: FID, name: STR, args: 0~3, returns: ENUM }`
  - 인자(`args`) 개수는 최대 3개로 물리적으로 제한된다.
- **Module Spec:** `{ id: MODID, tier: INT, public: Func[], internal: Func[], atomic: STR[] }`
- **Layer Spec:** `{ id: LID, modules: Module[] }` (하위 정보를 하드코딩으로 중첩 확장)
- **System Spec:** `{ id: SYSID, layers: Layer[] }` (전체 위계를 집대성)

> **The Law of Dependency (의존성의 법칙)**
> 두 모듈 간의 관계가 레이어 배치를 결정한다.
>
> 1. **Co-location (동거):** 서로를 참조(Cycle)하거나 긴밀히 결합되어 있다면 반드시 같은 계층에 배치한다.
> 2. **Strict Separation (엄격한 분리):** 참조가 단방향(One-way)이라면 참조 받는 자(Server)를 하위에, 참조 하는 자(Client)를 상위에 배치한다.

이 법칙에 따라 다음의 불변 규약이 강제된다.

| 접근 유형                | 허용 여부 | 원칙 (The Principle)                        |
| :----------------------- | :-------: | :------------------------------------------ |
| **Universal Layer 접근** |  ✅ 허용  | 모든 Layer에서 직접 접근 가능 (기저 계층)   |
| **Layer N → Layer N-1**  |  ✅ 허용  | 인접 하위 계층만 참조 (Strict Layer)        |
| **Layer N-1 → Layer N**  |  ❌ 금지  | 역방향 참조 절대 불가 (TDZ 차단)            |
| **Layer N 내부 모듈 간** |  ❌ 금지  | 수평 참조 불가 (상위 계층이 오케스트레이션) |
| **순환 참조 (Cycle)**    |  ❌ 금지  | 런타임 부팅 시 즉시 패닉 (TDZ)              |

**[해결책 (Resolution)]**

1. **합병:** 서로 의존하면 같은 모듈로 합친다
2. **중개:** 상위 Layer가 둘을 중개한다
3. **분리:** 의존 방향을 한쪽으로 정리하여 별도 Layer로 분리한다

**[모듈의 원자성 (Atomicity)]**

모듈은 더 이상 쪼개질 수 없는 **최소 논리 단위**이며, 다음 규칙을 통해 그 원자성을 보장한다.

1.  **불가분성 (Indivisibility):** 모듈은 특정 계층에 통째로 배치되어야 하며, 그 일부 기능이 다른 계층에 걸쳐 존재할 수 없다. 모듈의 일부 기능만 이동이 필요하다면, 해당 코드는 이미 원자성이 파괴된 것이므로 즉시 더 작은 단위로 **해체(Decompose)**하여 재배치해야 한다.
2.  **성질의 단일성 (Purity of Nature):** 하나의 모듈은 **구조적 분류학(Architectural Taxonomy)** 중 **오직 한 가지 성질**만을 가져야 한다. (예: 순수 논리와 환경 어댑터가 섞인 모듈은 존재할 수 없다.)
3.  **책임의 완결성 (Completeness):** 모듈의 경계는 단순히 코드의 양이 아니라, 다루는 데이터와 책임이 독립적으로 완결되는지를 기준으로 정의한다.

**[계층의 발현과 진화 (Evolution)]**

계층은 고정된 상수가 아니라, 의존성 조사를 통해 **발견(Discovered)**되는 역동적인 구조다.

1.  **계층 분리:** 동일 계층 내에서 명확한 단방향 의존성이 발견된다면, 이는 즉시 별개의 계층으로 분리되어야 함을 의미한다.
2.  **계층 삽입:** 기존 계층 사이에 배치하기 모호하거나 새로운 단방향 관계를 형성하는 중간 모듈이 식별된다면, 새로운 계층 번호를 부여하여 전체 위계를 재확정한다.
3.  **최종 판단:** 아키텍처 구현 및 진화 과정에서 발생하는 모든 구조적 혼란에 대한 유일한 판결 기준은 **섹션 1의 계층화 원칙**이다.

> [!IMPORTANT]
> 런타임(TDZ)이 잡지 못하는 위반은 `Verify.audit()`에서 **부팅 시점에 반드시 감지**해야 한다.

---

### 1.5. Inter-Layer Communication: 통신 불변 규약

> **Principle:** 모든 계층이 접근 가능한 통합 통신 수단(**Channel**)은 반드시 **Universal Layer (기저 계층)**에 정의되어야 한다. 이는 메모리/스레드/네트워크 경계를 추상화한다.

| 통신 방향              | 허용 방식 (Protocol)               | 금지 사항 (Prohibition)                 |
| :--------------------- | :--------------------------------- | :-------------------------------------- |
| 하위 → 상위            | **불가** (TDZ 위반)                | 역방향 참조 절대 불가                   |
| 상위 → 인접 하위       | **Direct Call** (직접 호출)        | 인접하지 않은 계층 건너뛰기 금지        |
| 동일 계층 내           | **Indirect** (Channel)             | 직접 Import/Call 금지                   |
| 외부 → 내부 (Boundary) | **Public API** (Channel/Interface) | 내부 모듈 직접 접근 금지                |
| **원자적 이행**        | **Atomic Handover**                | 함수 단위 완결 후 제어권 즉각 반납 필수 |

> [!IMPORTANT]
> 모든 연산은 원자적 함수 단위로 완결되어야 하며, 실행 직후 반드시 런타임에 제어권을 반납하여 물리적 독점을 방지한다. 코어 로직 내 `yield` 사용은 엄격히 금지된다.

---

### 1.6. Post-Web Continuity Strategy (The Invariant Kernel)

플랫폼 붕괴 시에도 비즈니스 로직과 데이터의 생명을 유지하기 위한 연속성 전략이다.

1.  **Platform Agnosticism:** 커널 코어는 자신이 브라우저에 있는지 등 외부 환경을 알지 못해야 한다. `window`, `document` 등 전역 객체 접근은 오직 **Platform Adapter** 내부에서만 허용된다.
2.  **IO-Less Logic:** 모든 비즈니스 로직은 화면이 없는 환경에서도 동일하게 실행 가능해야 한다. UI 상태(스크롤 위치)와 도메인 상태(유저 데이터)를 엄격히 분리한다.
3.  **Disposable Adapter:** 미래에 브라우저가 사라지면 플랫폼 어댑터와 뷰 레이어만 폐기하고 교체한다.
4.  **Native Universe:** 본 아키텍처는 C/C++, Go, Kotlin, Python 확장을 목표로 한다. (단, 사상적 결함으로 인해 **Rust는 영구히 배제한다.**)

---

### 1.7. Boundary of Control (Inescapable Runtime Constraints)

우리는 JavaScript 엔진의 내부 동작(GC, JIT, Event Loop 등)을 직접 제어할 수 없음을 인정하며, 이를 시스템이 준수해야 할 '불가항력적 경계'로 정의한다.

1.  **Minor GC (Scavenger) Management:** 모든 동적 객체는 생성된 직후의 단일 실행 틱(Tick) 내에서 소멸하거나 정식 메모리 영역으로 기록되어야 한다. 이를 통해 엔진의 Old Space 오염을 차단하고, 시스템 전체를 멈추는 Major GC(Stop-the-world)의 물리적 발생 원인을 억제한다.
2.  **Monomorphism (Shape Stability):** 객체 구조는 생성 시점에 모든 프로퍼티를 즉시 확정해야 하며, 이후 임의의 형상(Hidden Class) 변경을 영구히 금지한다. 이는 엔진이 고속 최적화 경로(Inline Cache)를 이탈하지 않게 강제하는 물리적 계약이다.
3.  **Pointer-based Sequence Control:** 데이터 처리 시 메모리 이동 및 복사를 배제하기 위해 고정 배열(TypedArray)을 사용한다. 모든 선후 관계는 정수 인덱스(Read/Write Pointer)의 순환만으로 정의되며, 이 포인터의 물리적 위치가 실행 인과율의 유일한 권위가 된다.
4.  **Interface Air-lock:** 런타임 콜백(EventListener, Timer 등) 시점의 지연을 상시 감시한다. 엔진 지연(Drift) 감지 시 유계된 과거 이벤트를 차단(Drain)하고, 시스템 진입점에서 오염된 신호가 커널 내부로 유입되는 것을 물리적으로 막는다.

| 통제 불가능 변수       | 대응 전략 (Mitigation Strategy)                                                                                                                                                                            | 책임 영역    |
| :--------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **Garbage Collection** | **Minor GC (Scavenger) Management**: 동적 객체의 수명을 Scavenger 임계치 내로 한정하여 Major GC(Stop-the-world) 발생 원인을 물리적으로 제거.                                                               | Environment  |
| **JIT Optimization**   | **Monomorphism**: 객체의 **Shape(Hidden Class)**를 생성 시점에 고정하여 엔진이 최적화된 실행 경로(Inline Cache)를 유지하도록 강제.                                                                         | Foundation   |
| **Event Loop Delay**   | **Web Workers (Isolate)**: 독립된 힙과 프로세싱을 가진 멀티 워커를 활용하여 특정 스레드의 지연이 전 시스템의 중단으로 번지는 것을 방지.                                                                    | Kernel       |
| **OS Interrupt**       | **Atomic Integrity**: Atomics API를 사용한 공유 메모리 제어. <br> **Black Box Journaling**: 임베디드/로봇 방식의 Append-only 비동기 기록. 비정상 종료 시 저널 기반의 사건 재현(Replay)을 통해 인과율 복구. | Orchestrator |

---

### 1.8. Operational Policy: Architectural Sovereignty (Immutable Distribution)

울트론킷은 **"영원한 안정성(Eternal Stability)"**을 지향하며, 배포 정책은 '대중적 안정성'과 '미션적 진보'라는 두 개의 독립된 주권(Sovereignty)을 가진다.

1.  **Legacy Protection (Tier 1~2):** 일반 프로젝트 및 CDN 사용자를 위해 DX와 하위 호환성을 최우선으로 보호한다. 단, CDN 서비스(Latest Release) 이용 시 발생하는 실시간 규격 변화는 사용자가 전적으로 감수해야 하며, 안정적인 운영 확신이 필요한 경우 반드시 파일을 직접 다운로드하여 고정(Freeze)해야 한다. (**Update or Die 철학 배제**)
2.  **Mission Evolution (Tier 3):** 미션 크리티컬 영역은 시스템의 공격적인 무결성 강화 혜택을 온전히 수용한다. 이 영역은 하위 호환성보다 물리적 무결성의 극한을 우선하며, **무결성 기준 강화에 따른 상시 브레이킹 체인지를 허용**한다.
3.  **Download & Freeze (Version Locking):** 시스템의 물리적 생존을 위해, 미션 환경(Tier 3)은 특정 시점의 단일 파일(`ultronkit.js`)을 로컬에 고정하여 사용하는 것을 원칙으로 강제한다. 이는 외부 요인(네트워크, 도구의 사멸)에 관계없이 시스템이 수세기 동안 동일하게 동작함을 보장한다. 일반 프로덕션(Tier 1~2) 사용자 또한 CDN의 편의성보다 안정성을 우선할 경우 이 방식을 자유롭게 선택할 수 있으며, 이 모든 결정은 사용자의 아키텍처 주권에 속한다.

---

### 1.9. Recursive Document Supremacy (재귀적 문서 우위)

본 명세서의 구조는 그 자체로 엄격한 **단방향 의존성(One-way Dependency)**을 가지며, 시스템 부팅 시점에 물리적 강제력을 가진다.

| 위계 (Hierarchy)        | 권한 (Authority)                                                | 물리적 집행력               |
| :---------------------- | :-------------------------------------------------------------- | :-------------------------- |
| **Section N**           | **Section N+1의 헌법(Constitution).** 절대적 상위 규범.         | 수정 시 하위 즉시 무효      |
| **Section N+1**         | **Section N의 종속물(Dependent).** 상위 규범 위반 시 무효.      | 상위 규격 위반 시 부팅 차단 |
| **Code Implementation** | **Document의 그림자 (Shadow).** 명세서와 1비트라도 다르면 배신. | 불일치 시 런타임 진입 봉쇄  |

**[판결 및 집행 원칙 (Adjudication & Enforcement)]**

1.  **Waterfall Authority:** 상위 섹션(N)이 확정되기 전에는 하위 섹션(N+1)을 작성하거나 수정할 수 없다.
2.  **Cascade Update:** 상위 섹션(N)이 수정되면, 그 아래 모든 하위 섹션(N+1 ~ End)은 즉시 **폐기(Invalidated)** 상태가 되며 재검토해야 한다.
3.  **Conflict Resolution:** 상위 섹션과 하위 섹션의 내용이 충돌할 경우, 무조건 **상위 섹션(N)이 진실(Truth)**이다.
4.  **Formatting Rule:** 헤더 깊이는 최대 2단계로 제한하며, 하위 항목은 10개를 초과할 수 없다. **섹션 번호 N은 반드시 1 이상 10 이하의 정수여야 한다.** (0 또는 11 이상의 섹션은 물리적으로 존재가 불가능하다.)

---

### 1.10. Universal Architectural Taxonomy (구조적 분류학)

UltronKit 아키텍처는 계층(Layer)의 개수가 변하더라도, 아래 4가지 **본질적 역할군(Essential Roles)**의 분류를 영원히 유지한다. 모든 코드는 반드시 이 중 하나에 속해야 한다.

| 분류 (Taxonomy)           | 본질 (Nature)                       | 의존성 (Dependency) | 대표 예시 (Examples)               |
| :------------------------ | :---------------------------------- | :------------------ | :--------------------------------- |
| **1. Fundamental Base**   | **Pure Logic.** (순수, 불변)        | **None.** (최하위)  | `Primitives`, `Constants`          |
| **2. Interface Adaptor**  | **Impure I/O.** (환경 종속)         | **Base Only.**      | `Browser API`, `Worker`, `System`  |
| **3. Core Instruments**   | **Orchestration.** (조율 도구)      | **Base + Env.**     | `State`, `Logic`, `View`, `Verify` |
| **4. Application Domain** | **Mission Definition.** (목적 정의) | **All Below.**      | `App`, `Mission Code`              |

**[설계 원칙 및 물리 공리 (Design Principles & Axioms)]**

1.  **Single Binary:** 결과물은 외부 의존성이 제거된 **단일 배포 단위(Single Unit)**로 동작한다. (`ultronkit.js`)
2.  **Strict Hierarchy:** 분류 상위(4)는 하위(1)를 자유롭게 쓰지만, 하위는 상위를 절대 알 수 없다.
3.  **Orthogonality:** 코드의 **논리적 계층(Taxonomy)**과 **물리적 실행 환경(Thread)**은 독립된 축이다.
4.  **Fail-Safe Survival:** 상위 계층(UI/App)이 붕괴되어도 하위 계층(Data/Logic)은 생존하여 동작한다.
5.  **Native Expansion:** 본 아키텍처는 **C/C++, Go, Kotlin, Python** 구현을 전제로 설계되었으며, 언어가 바뀌어도 구조는 불변이다. (**Rust는 영구히 배제한다.**)
6.  **Data Vitality Model**: 모든 모듈은 처리 데이터를 **Command(인과 의무)**와 **State(휘발 현행)**로 물리적으로 분리하여 관리해야 하며, 이는 1.7의 생존 주기를 따른다.
7.  **Static Memory Solidarity**: 모든 데이터 폼은 부팅 시 확정된 정적 슬롯(Static Slots)에만 상주하며, 런타임 신규 할당은 명세에 대한 '배신'으로 보아 금지한다. (MCC 준수)

**※ 명칭의 유연성:** 위 명칭은 분류를 위한 일반 명사이며, 구현 시 계층의 위계와 본질을 더 잘 표현하는 이름이 있다면 이를 우선하여 사용한다. 명세의 이름보다 실제 역할에 대한 직관성과 적합성이 더 중요하다.

---

## 2. The Architecture (Layer 구조)

**Layer**는 코드의 **논리적 의존성 순서**를 정의한다. 파일 내 물리적 배치 순서와 일치하며, JavaScript TDZ가 참조 방향을 강제한다.

```
┌─────────────────────────────────────────────────────────────────┐
│  Layer 4: APPLICATION                                           │
│    app.js (사용자 미션 코드, Sovereign API 통해 접근)            │
├─────────────────────────────────────────────────────────────────┤
│  Layer 3: KERNEL                                                │
│    ┌─ Core Modules:                                             │
│    │    Orchestrator, Effect, Boot, Verify                      │
│    │                                                            │
│    ├─ Data Domain Modules (IO-Less Logic):                      │
│    │    State, Logic, Policy, Form, Data, Context               │
│    │                                                            │
│    └─ View Domain Modules (Visual Logic):                       │
│         View, Motion, I18n, Theme, A11y, Route, Nav, Debug      │
├─────────────────────────────────────────────────────────────────┤
│  Layer 2: ENVIRONMENT                                           │
│    ┌─ Infrastructure Modules (Headless System):                 │
│    │    System (Pool, Cache, Memory)                            │
│    │    Async (Signal, TaskQueue, Channel, Leader)              │
│    │    Worker (Web Worker Host)                                │
│    │                                                            │
│    └─ Platform Modules (Native Binding):                        │
│         [Visual]   Dom, Canvas, Device, Notification            │
│         [Headless] Runtime, Network, Storage, Thread, Timer     │
│                    Event, Crypto, Wasm, Bridge, Share, Clipboard│
│                    ServiceWorker (Network Proxy)                │
├─────────────────────────────────────────────────────────────────┤
│  Layer 1: FOUNDATION (Universal)                                │
│    Primitives (ok, fail, panic, assert, tryCatch, loop, ...)    │
│    Constant (CONFIG, ERROR_CODES)                               │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1. 의존성 규칙 (Dependency Rules)

| 소스 Layer | 참조 가능 대상                | 금지 사항 (Violation → Panic)         |
| :--------: | :---------------------------- | :------------------------------------ |
|  Layer 1   | 없음 (최하위)                 | 어떤 상위 계층도 참조 불가            |
|  Layer 2   | Layer 1                       | Layer 3+ 참조 금지                    |
|  Layer 3   | Layer 1, 2 (인접 + Universal) | Layer 4 참조 금지, **모듈 별도 통제** |
|  Layer 4   | Sovereign API (Layer 3)       | 커널 내부 직접 접근 금지              |

> [!IMPORTANT]
> **Layer 1 (Foundation)은 Universal**: 모든 Layer에서 직접 접근 가능. Strict Layer의 유일한 예외.

### 2.2. 계층 위반 감지 (Layer Violation Detection)

| 감지 시점     | 감지 방법                                   | 위반 시 처리 |
| :------------ | :------------------------------------------ | :----------- |
| **정적 분석** | `Verify.audit()` - 코드 내 참조 패턴 검사   | Boot Panic   |
| **런타임**    | TDZ - JavaScript 엔진이 ReferenceError 발생 | 즉시 크래시  |
| **CI/CD**     | 외부 정적 분석 도구 (선택적)                | 배포 차단    |

---

## 2.5. Thread 구조 (물리적 실행 환경)

**Thread**는 코드가 **어느 메모리 공간에서 실행되는가**를 정의한다. Layer와 독립된 축이다.

| Thread             | 역할                   |   데이터 권한   |
| :----------------- | :--------------------- | :-------------: |
| **Main Thread**    | UI 렌더링, 사용자 입력 |    Read-Only    |
| **Web Worker**     | 연산, 상태 관리        | Write Authority |
| **Service Worker** | 네트워크 프록시, 캐시  |    I/O Proxy    |

### 2.5.1. Thread간 통신 프로토콜 (Inter-Thread Communication)

| 통신 경로              | 프로토콜                     | 데이터 형식      |
| :--------------------- | :--------------------------- | :--------------- |
| Main ↔ Worker          | `postMessage` + Transferable | Structured Clone |
| Main ↔ ServiceWorker   | `postMessage`                | Structured Clone |
| Worker ↔ ServiceWorker | `postMessage` (via Main)     | Structured Clone |
| 동일 Thread 내         | 직접 함수 호출               | 참조 전달        |

---

## 2.6. Layer ↔ Thread 매핑

| Layer | 모듈                                           | Thread                   |
| :---: | :--------------------------------------------- | :----------------------- |
|   1   | Foundation (Primitives, Constant)              | **All** (복사됨)         |
|   2   | Environment (Platform, Infrastructure)         | **All** / **Worker**     |
|   3   | Kernel Core (Effect, Verify, Boot)             | **Main Thread** (진입점) |
|   3   | Data Domain (State, Logic, Policy, Form, Data) | **Web Worker**           |
|   3   | View Domain (View, Motion, I18n, Theme 등)     | **Main Thread**          |
|   4   | Application                                    | Kernel이 분배            |

---

## 2.7. Panic 전파 경로 (Error Propagation)

모든 Layer를 관통하는 횡단 관심사로서, 에러 발생 시 전파 경로를 정의한다.

```
┌─────────────────────────────────────────────────────────────┐
│  ANY LAYER: Error 발생                                      │
│    ↓                                                        │
│  Primitives.panic(msg) 호출 (Layer 1)                       │
│    ↓                                                        │
│  [Worker인 경우] postMessage로 Main Thread에 전달           │
│    ↓                                                        │
│  Debug.panic(errors) 호출 (Layer 3 View Domain)             │
│    ↓                                                        │
│  Panic UI 렌더링 → 시스템 정지                              │
└─────────────────────────────────────────────────────────────┘
```

| 발생 위치        | 전파 경로                         | 최종 처리          |
| :--------------- | :-------------------------------- | :----------------- |
| Layer 1          | 즉시 Panic UI                     | 시스템 정지        |
| Layer 2          | Worker → Main → Panic UI          | 시스템 정지        |
| Layer 3 (Worker) | Worker → Main → Panic UI          | 시스템 정지        |
| Layer 3 (Main)   | 직접 Panic UI                     | 시스템 정지        |
| Layer 4          | Sovereign API → Kernel → Panic UI | 시스템 정지        |
| ServiceWorker    | postMessage → Main → Panic UI     | 네트워크 기능 정지 |

---

## 2.8. Runtime Flow (부팅 → 실행)

```
1. BOOT PHASE (Main Thread)
   ├─ Environment.Runtime.detect() → 환경 감지
   ├─ Layer 1 초기화 → Foundation 등록
   ├─ Layer 2 초기화 → Environment (Platform + Infra) 로드
   ├─ Layer 3 초기화 → Kernel Core + Domain 모듈 분배
   │    ├─ Data Domain → Worker로
   │    └─ View Domain → Main Thread에서
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

---

## 2.9. 파일 내 물리적 배치 (단일 파일 구조)

```javascript
// ════════════════════════════════════════════════════════════
// LAYER 1: FOUNDATION (Universal)
// ════════════════════════════════════════════════════════════
const CONST = { CONFIG: {...}, ERROR_CODES: {...} };
const Primitives = { ok, fail, panic, assert, tryCatch, loop, cases };
const PrimitivesData = { type, pick, strip, typed };

// ════════════════════════════════════════════════════════════
// LAYER 2: ENVIRONMENT
// ════════════════════════════════════════════════════════════
// -- Infrastructure (Headless) --
const System = { Pool: {...}, Cache: {...}, Memory: {...} };
const Async = { Signal: {...}, TaskQueue: {...}, Channel: {...}, Leader: {...} };
const Worker = { spawn, post, terminate };

// -- Platform (Native Binding) --
const Runtime = { detect, is };
const Dom = { create, query, queryAll, attr }; // Visual
const Network = { request, abort };
const Storage = { get, set, remove, clear };
const Thread = { spawn, post, terminate };
const Timer = { delay, interval, frame, idle };
const Event = { on, off };
// ... (Crypto, Wasm, Bridge, Share, Clipboard, Geo, Notification)
const ServiceWorker = { register, unregister };

// ════════════════════════════════════════════════════════════
// LAYER 3: KERNEL
// ════════════════════════════════════════════════════════════
// -- Core --
const Kernel = { boot };
const Effect = { put, call, service };
const Verify = { audit, inspect };

// -- Data Domain (→ Worker) --
const State = { get, set, update, snapshot, restore, transaction, invariant };
const Logic = { register, dispatch };
const Policy = { define, validate };
const Form = { register, validate, dirty, touched, errors };
const Data = { Vault: {...}, Sync: {...}, Migration: {...}, Offline: {...} };
const Context = { provide, inject };

// -- View Domain (→ Main Thread) --
const View = { render, patch, diff, bind, list, include, slot, virtual };
const Motion = { transition, animate };
const I18n = { set, get, bind };
const Theme = { inject, switch, token };
const A11y = { audit, fix };
const Route = { match, add, remove, parseQuery, buildQuery };
const Nav = { go, replace, back, forward, beforeEnter, beforeLeave };
const Prefetch = { link, hover };
const Debug = { panic, inspect };

// ════════════════════════════════════════════════════════════
// SOVEREIGN API EXPORT (Layer 4 진입점)
// ════════════════════════════════════════════════════════════
window.UltronKit = { Identity, State, Logic, Design, Ops, Policy, Grid };
```

> [!CAUTION]
> 위 순서는 JavaScript TDZ에 의해 강제된다. Layer N은 Layer N-1 이하만 참조 가능하며, 이를 위반 시 `ReferenceError`가 발생한다.

---

## PENDING: 섹션 2 이후로 이동 예정

> [!WARNING]
> 아래 내용은 섹션 1 완결 후 해당 섹션으로 이동됩니다.

### [PENDING] Layer 상세 정의 (→ 섹션 2~8)

> [!NOTE]
> Below are the NEW specifications moved from Section 2.

#### Section 3: Environment Layer (Detailed)

- **Infrastructure (Internal):** System, Async, Worker 상세
- **Platform (Internal):** Runtime, Dom, Network, etc. 상세
- **Module Isolation (Internal):** Infra -> Platform (One-way)

#### Section 4: Kernel Layer (Detailed)

- **Core:** Boot, Effect, Verify
- **Data Domain:** State, Logic, Policy (Worker)
- **View Domain:** View, Motion, Theme (Main)

---

#### [Legacy] Layer 상세 정의 (구버전)

#### Layer 1: Foundation (순수 함수)

- **특징:** 부수 효과 없음, 외부 의존성 없음, DOM/Network 접근 금지
- **배치:** 모든 Thread에 복사됨 (Universal)
- **포함:**
  - `Primitives.Result`: `ok(data)`, `fail(code, msg)`
  - `Primitives.Control`: `panic(msg)`, `assert(cond, msg)`, `tryCatch(fn, onError)`, `loop(arr, fn, limit)`, `cases(val, handlers)`
  - `Primitives.Data`: `type(val)`, `pick(obj, key)`, `strip(str)`, `typed(val, schema)`, `validateTypedArray(arr)`
  - `CONST`: 상수, 에러 코드, 설정값

> [!WARNING]
> Panic.UI, Inspect.UI는 DOM 의존성으로 인해 **Layer 5 (View Domain)**에 배치됨.

#### Layer 2: Platform (런타임 추상화)

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

#### Layer 3: Infrastructure (시스템 서비스)

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

#### Layer 4: Data Domain (비즈니스 데이터)

- **특징:** 상태 관리, 비즈니스 로직, 영속성
- **배치:** Worker Thread
- **포함:**
  - **State**
    - `State.get(path)`, `State.set(path, val)`, `State.update(fn)`
    - `State.snapshot()`, `State.restore(snapshot)`
    - `State.transaction(fn)`: begin, commit, rollback
    - `State.invariant(name, fn)`: register, check
  - **Logic**: 액션 핸들러, 리듀서
  - **Policy**: 검증 스키마, 불변식 정의
  - **Form**
    - `Form.register(name, schema)`, `Form.validate(name, data)`
    - `Form.dirty(name)`, `Form.touched(name)`, `Form.errors(name)`
  - **Context** (All Threads)
    - `Context.provide(key, val)`, `Context.inject(key)`
  - **Data**
    - `Data.Vault`: read, write, delete, clear, atomic
    - `Data.Sync`: run, delta, conflict
    - `Data.Migration`: check, run, rollback
    - `Data.Offline`: queue, flush, retry
    - `Data.Blackbox`: record, dump, clear
    - `Data.query`: fetch(key, fn), invalidate(key), prefetch(key)

#### Layer 5: View Domain (UI/UX)

- **특징:** UI 렌더링, 네비게이션, 테마
- **배치:** Main Thread
- **포함:**
  - **View** (구 Morph)
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
  - **Motion**
    - `Motion.transition(el, { enter, leave, move })`
    - `Motion.animate(el, keyframes, opts)`
  - **I18n**
    - `I18n.set(lang, dict)`, `I18n.get(key)`, `I18n.bind(el, key)`
  - **Theme**
    - `Theme.inject(tokens)`, `Theme.switch(name)`, `Theme.token(name)`
  - **A11y**
    - `A11y.audit(el)`, `A11y.fix(el, issue)`
  - **Route**
    - `Route.match(path)`, `Route.add(path, handler)`, `Route.remove(path)`
    - `Route.parseQuery(url)`, `Route.buildQuery(params)`
  - **Nav**
    - `Nav.go(path)`, `Nav.replace(path)`, `Nav.back()`, `Nav.forward()`
    - `Nav.beforeEnter(fn)`, `Nav.beforeLeave(fn)`
    - `Nav.saveScroll()`, `Nav.restoreScroll()`
  - **Prefetch**
    - `Prefetch.link(path)`, `Prefetch.hover(el)`
  - **Debug**
    - `Debug.panic(errors)`: 패닉 UI 렌더링
    - `Debug.inspect()`: 인스펙터 UI 렌더링

#### Layer 6: Kernel (오케스트레이터)

- **특징:** 부팅, 메시지 라우팅, Sovereign API 제공
- **배치:** Main Thread (진입점)
- **포함:**
  - `Kernel.boot`: 시스템 초기화
  - `Effect`: 사이드 이펙트 디스패처
  - `Verify`: 감사 엔진
  - Sovereign API (`Identity`, `State`, `Logic`, `Design`, `Ops`, `Policy`, `Grid`)

#### Layer 7: Application (사용자 코드)

- **특징:** 미션별 비즈니스 로직
- **배치:** Sovereign API를 통해 정의, 커널이 적절한 Thread로 분배
- **파일:** `app.js`

### [PENDING] Universal Runtime (→ 환경 호환성 섹션)

본 커널은 단일 파일로 다음 환경을 모두 지원한다.

| 기능                      | Browser | Node.js | Android WV | Desktop WV |
| :------------------------ | :-----: | :-----: | :--------: | :--------: |
| **Layer 1-3**             |   ✅    |   ✅    |     ✅     |     ✅     |
| **Layer 4 (Data Domain)** |   ✅    |   ✅    |     ✅     |     ✅     |
| **Layer 5 (View Domain)** |   ✅    |   ❌    |     ✅     |     ✅     |
| **Platform.Dom**          |   ✅    |   ❌    |     ✅     |     ✅     |
| **Platform.Network**      |   ✅    |   ✅    |     ✅     |     ✅     |
| **Platform.Storage**      |   ✅    |   ✅    |     ✅     |     ✅     |
| **Platform.Bridge**       |   ❌    |   ❌    |     ✅     |     ✅     |
| **Platform.Share**        |   ✅    |   ❌    |     ✅     |     ❌     |
| **Platform.Geo**          |   ✅    |   ❌    |     ✅     |     ❌     |
| **Platform.Notification** |   ✅    |   ❌    |     ✅     |     ✅     |

> [!NOTE]
> 환경에 없는 기능 호출 시 명확한 에러 코드 반환: `E_NO_DOM`, `E_NO_BRIDGE` 등

---

## 문서 아웃라인 (Draft)

> [!NOTE]
> 제목은 미확정. 각 섹션에서 **다룰 내용**만 정의함.

| 섹션   | 다룰 내용                                                          | 상태      |
| :----- | :----------------------------------------------------------------- | :-------- |
| **1**  | 레이어 아키텍처 전체 구조 (철학, 7계층, 의존성, Thread, 통신 규약) | 🔧 작업중 |
| **2**  | Layer 1 (Foundation) 레이어 상세                                   | ⏳ 대기   |
| **3**  | Layer 2 (Platform) 레이어 상세                                     | ⏳ 대기   |
| **4**  | Layer 3 (Infrastructure) 레이어 상세                               | ⏳ 대기   |
| **5**  | Layer 4 (Data Domain) 레이어 상세                                  | ⏳ 대기   |
| **6**  | Layer 5 (View Domain) 레이어 상세                                  | ⏳ 대기   |
| **7**  | Layer 6 (Kernel) 레이어 상세                                       | ⏳ 대기   |
| **8**  | Layer 7 (Application) 레이어 상세 + Sovereign API                  | ⏳ 대기   |
| **9+** | 각 모듈별 상세 (Primitives, State, View, ...)                      | ⏳ 대기   |
| **N**  | Audit & Verification System (감사/검증 시스템)                     | ⏳ 대기   |
| **N**  | Algorithm Specification (핵심 알고리즘 명세)                       | ⏳ 대기   |
| **N**  | Evolution & Refactoring Protocol (진화/리팩토링 절차)              | ⏳ 대기   |
| **N**  | Onboarding Guide (온보딩 가이드)                                   | ⏳ 대기   |

> [!IMPORTANT]
> **의존성 규칙:** 하위 섹션은 상위 섹션에 의존한다. 섹션 N 작업 중 섹션 N-1 이전 수정 필요 시 → 작업 중단 → 상위 먼저 수정 → 전체 재검토.

### [MOVED/RECOVERED] Architecture-Specific Rules (From Section 1.4/2.2)

Layer 3 (Kernel) 내부 모듈과 Layer 2 (Environment) 모듈 간의 접근 권한을 세분화한다.

| 소스 모듈 (Caller)          | 허용된 대상 (Callee)               | 금지된 대상 (Violation)          |
| :-------------------------- | :--------------------------------- | :------------------------------- |
| **Layer 3: Core**           | Layer 2 전체                       | 없음                             |
| **Layer 3: Data Domain**    | L2 Infrastructure, L2 Headless     | **L2 Visual (Dom 등) 절대 금지** |
| **Layer 3: View Domain**    | Layer 2 전체                       | 없음                             |
| **Layer 2: Infrastructure** | Layer 1, **L2 Platform(Headless)** | L2 Visual 참조 금지              |
| **Layer 2: Platform**       | Layer 1                            | L2 Infrastructure 참조 금지      |

> [!NOTE]
> **Layer 2 내부 규칙**: `Infrastructure`는 `Platform`(Timer, Event 등)을 사용할 수 있지만, `Platform`은 `Infrastructure`를 사용할 수 없다. (단방향 흐름 유지)
